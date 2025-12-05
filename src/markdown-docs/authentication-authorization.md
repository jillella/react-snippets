Explaining authentication and authorization step by step, referencing the codebase.


[3 tools called]


# Authentication & Authorization: Interview Explanation

## 1. Authentication vs Authorization

- Authentication: Verifying who the user is (login/register)
- Authorization: Verifying what the user can do (access control)

This codebase uses JWT for stateless authentication.

---

## 2. Registration Flow (Password Hashing with bcryptjs)

### Step 1: User submits credentials
```5:17:src/controllers/authController.js
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  }
```

### Step 2: Hash password with bcryptjs
```19:21:src/controllers/authController.js
  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
```

Why bcryptjs:
- One-way hashing (no plaintext storage)
- Salt (10 rounds) prevents rainbow table attacks
- Slow by design to resist brute force

What happens:
1. `genSalt(10)` generates a random salt
2. `hash(password, salt)` produces a salted hash
3. Store the hash, not the password

Example:
- Plain: `"mypassword123"`
- Hashed: `"$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"`

### Step 3: Store user in database
```23:30:src/controllers/authController.js
  // Create User
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
```

### Step 4: Generate JWT token
```32:33:src/controllers/authController.js
  // Generate JWT Token
  const token = generateToken(user.id, res);
```

---

## 3. JWT Token Generation

### Token structure
```3:7:src/utils/generateToken.js
export const generateToken = (userId, res) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
```

JWT has 3 parts:
1. Header: algorithm (HS256)
2. Payload: `{ id: userId }` + expiration
3. Signature: HMAC of header + payload + secret

Example token:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxNjE2ODQzODIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Token storage: dual strategy
```9:14:src/utils/generateToken.js
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return token;
```

1. HTTP-only cookie (automatic on requests)
   - `httpOnly: true` prevents JavaScript access (XSS protection)
   - `secure: true` in production (HTTPS only)
   - `sameSite: "strict"` mitigates CSRF
   - `maxAge: 7 days` sets expiration

2. Response body (for client storage)
   - Client can store in localStorage/sessionStorage
   - Useful for mobile apps or SPAs

Why both:
- Cookie: automatic, secure by default
- Body: flexibility for different clients

---

## 4. Login Flow (Password Verification)

### Step 1: Find user by email
```48:58:src/controllers/authController.js
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user email exists in the table
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
```

### Step 2: Verify password with bcrypt
```60:65:src/controllers/authController.js
  // verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
```

How `bcrypt.compare()` works:
1. Takes plain password and stored hash
2. Extracts salt from hash
3. Hashes plain password with same salt
4. Compares results

Security note: Generic error message prevents user enumeration.

### Step 3: Generate and return token
```67:79:src/controllers/authController.js
  // Generate JWT Token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
      },
      token,
    },
  });
};
```

---

## 5. Authorization Middleware (Protecting Routes)

### Step 1: Extract token from request
```6:16:src/middleware/authMiddleware.js
export const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }
```

Two sources:
1. Authorization header: `Bearer <token>`
2. Cookie: `jwt` cookie

### Step 2: Check if token exists
```18:20:src/middleware/authMiddleware.js
  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }
```

### Step 3: Verify token signature
```22:24:src/middleware/authMiddleware.js
  try {
    // Verify token and extract the user Id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

What `jwt.verify()` does:
1. Checks signature with `JWT_SECRET`
2. Validates expiration
3. Returns decoded payload: `{ id: "userId", iat: ..., exp: ... }`

If invalid: throws error (caught below).

### Step 4: Fetch user from database
```26:32:src/middleware/authMiddleware.js
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }
```

Why check the database:
- User may be deleted
- Token may be valid but user invalid
- Enables revocation (if needed)

### Step 5: Attach user to request
```34:35:src/middleware/authMiddleware.js
    req.user = user;
    next();
```

`req.user` is available in protected route handlers.

### Step 6: Error handling
```36:38:src/middleware/authMiddleware.js
  } catch (err) {
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
```

Catches:
- Expired tokens
- Invalid signatures
- Malformed tokens

---

## 6. Authorization in Action (Resource-Level Checks)

Example from watchlist controller:
```65:70:src/controllers/watchlistController.js
  // Ensure only owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }
```

Authorization check:
- `req.user.id` from middleware
- Compare with resource owner
- 403 Forbidden if not authorized

---

## 7. Logout Flow

```82:91:src/controllers/authController.js
const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
```

What happens:
- Clears cookie by setting expiration to past
- Client should also remove token from storage

Note: JWT is stateless. Server doesn't track tokens, so logout is client-side. For server-side revocation, use a token blacklist or refresh tokens.

---

## Interview Talking Points

### Security best practices implemented
1. Password hashing: bcrypt with salt
2. HTTP-only cookies: XSS protection
3. Secure flag: HTTPS in production
4. SameSite: CSRF protection
5. Token expiration: 7 days
6. Generic error messages: prevent enumeration
7. Database verification: ensures user still exists

### Trade-offs
- Stateless: scalable, but harder to revoke
- Dual storage: flexibility vs complexity
- Database lookup: adds latency but ensures validity

### Potential improvements
1. Refresh tokens for long-lived sessions
2. Token blacklist for immediate revocation
3. Rate limiting on auth endpoints
4. Password strength requirements
5. Email verification
6. 2FA/MFA

---

## Complete Flow Diagram

```
REGISTRATION:
User → POST /auth/register → Check email exists → Hash password → Save user → Generate JWT → 
Set cookie + Return token → User authenticated

LOGIN:
User → POST /auth/login → Find user → Compare password → Generate JWT → 
Set cookie + Return token → User authenticated

PROTECTED ROUTE:
Client → Request with token → authMiddleware → Extract token → Verify signature → 
Fetch user → Attach to req.user → Route handler → Authorization check (if needed) → Response
```

This setup provides secure authentication with JWT and bcrypt, with clear separation between authentication (who you are) and authorization (what you can do).