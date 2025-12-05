# Authentication & Authorization Flow - Interview Prep (Text Only)

## 1. REGISTRATION FLOW

**Step 1:** User sends name, email, password to `/auth/register`

**Step 2:** Check if email already exists in database

**Step 3:** If exists, return 400 error

**Step 4:** If new, generate random salt using bcrypt (10 rounds)

**Step 5:** Hash password with salt using bcrypt

**Step 6:** Store user in database with hashed password (never store plaintext)

**Step 7:** Generate JWT token containing user ID, signed with secret key, expires in 7 days

**Step 8:** Set JWT as HTTP-only cookie (automatic on future requests)

**Step 9:** Return token in response body (for client storage)

**Step 10:** Return user info (without password) and token to client

---

## 2. LOGIN FLOW

**Step 1:** User sends email and password to `/auth/login`

**Step 2:** Find user by email in database

**Step 3:** If user not found, return generic 401 error (don't reveal if email exists)

**Step 4:** If found, use bcrypt to compare plain password with stored hash

**Step 5:** bcrypt extracts salt from hash, hashes plain password with same salt, compares results

**Step 6:** If password doesn't match, return generic 401 error

**Step 7:** If password matches, generate JWT token with user ID

**Step 8:** Set JWT as HTTP-only cookie

**Step 9:** Return token in response body

**Step 10:** Return user info and token to client

---

## 3. PROTECTED ROUTE ACCESS (Authorization Middleware)

**Step 1:** Client makes request to protected route (e.g., `/watchlist`)

**Step 2:** Client includes token either in Authorization header as "Bearer <token>" OR automatically sends cookie

**Step 3:** Middleware checks for token in header first, then cookie

**Step 4:** If no token found, return 401 Unauthorized

**Step 5:** If token exists, verify signature using JWT_SECRET

**Step 6:** JWT verification checks: signature valid, not expired, properly formatted

**Step 7:** If verification fails, return 401 Unauthorized

**Step 8:** If valid, extract user ID from token payload

**Step 9:** Fetch full user record from database using extracted ID

**Step 10:** If user doesn't exist in database, return 401 (user deleted but token still valid)

**Step 11:** If user exists, attach user object to request as req.user

**Step 12:** Call next() to proceed to route handler

**Step 13:** Route handler can access req.user for authorization checks

---

## 4. RESOURCE-LEVEL AUTHORIZATION

**Step 1:** Protected route handler receives request with req.user attached

**Step 2:** Handler fetches resource from database (e.g., watchlist item)

**Step 3:** Check if resource exists, return 404 if not

**Step 4:** Compare resource owner ID with req.user.id

**Step 5:** If IDs don't match, return 403 Forbidden (not authorized to access this resource)

**Step 6:** If IDs match, proceed with operation (update/delete)

**Step 7:** Return success response

---

## 5. LOGOUT FLOW

**Step 1:** User sends request to `/auth/logout`

**Step 2:** Server clears JWT cookie by setting it to empty with expiration in past

**Step 3:** Client should also delete token from localStorage/sessionStorage if stored there

**Step 4:** Return success message

**Note:** JWT is stateless, so server doesn't track active sessions. Logout is client-side cleanup.

---

## KEY CONCEPTS TO EXPLAIN

### Password Security (bcryptjs)
- Never store plaintext passwords
- bcrypt is one-way hashing (can't reverse)
- Salt prevents rainbow table attacks
- Slow by design to resist brute force
- Compare function extracts salt automatically

### JWT Token Structure
- Three parts: Header (algorithm), Payload (user data), Signature (verification)
- Stateless: server doesn't store tokens
- Self-contained: user info embedded in token
- Signed with secret key to prevent tampering

### Token Storage Strategy
- HTTP-only cookie: automatic, secure, prevents XSS
- Response body: flexible for different clients
- Both methods supported for maximum compatibility

### Authentication vs Authorization
- Authentication: Verifying WHO you are (login/register)
- Authorization: Verifying WHAT you can do (access control)
- Middleware handles authentication
- Route handlers handle authorization

### Security Features
- HTTP-only cookies prevent JavaScript access
- Secure flag enforces HTTPS in production
- SameSite prevents CSRF attacks
- Token expiration limits exposure window
- Generic error messages prevent user enumeration
- Database verification ensures user still exists

---

## COMMON INTERVIEW QUESTIONS & ANSWERS

**Q: Why use bcrypt instead of MD5 or SHA256?**
A: bcrypt is designed to be slow and uses salt automatically, making brute force attacks impractical. MD5/SHA256 are fast and vulnerable to rainbow tables.

**Q: Why check database even if JWT is valid?**
A: User might be deleted, account disabled, or permissions changed. Database check ensures user still exists and is active.

**Q: How do you handle token expiration?**
A: JWT includes expiration timestamp. When expired, verification fails and user must login again. Could implement refresh tokens for better UX.

**Q: What if token is stolen?**
A: JWT is stateless, so immediate revocation is difficult. Best practices: short expiration times, HTTPS only, refresh token rotation, or implement token blacklist.

**Q: Why both cookie and response body for token?**
A: Cookies work automatically for web apps, but mobile apps or SPAs might prefer manual token management. Supporting both increases flexibility.

**Q: How does logout work if tokens are stateless?**
A: Server clears cookie and client deletes stored token. For immediate revocation, would need token blacklist or refresh token system.