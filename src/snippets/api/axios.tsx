import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Example 1: Basic axios with .then()
function AxiosBasic() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h3>Posts ({posts.length})</h3>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {posts.slice(0, 10).map((post) => (
          <div
            key={post.id}
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <h4>{post.title}</h4>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>{post.body}</p>
            <small>Post ID: {post.id} | User ID: {post.userId}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example 2: Axios with async/await
function AxiosAsync() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Posts using async/await ({posts.length})</h3>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {posts.slice(0, 5).map((post) => (
          <div
            key={post.id}
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <h4>{post.title}</h4>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example 3: Axios with cancel token (cleanup)
function AxiosWithCancel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        cancelToken: cancelTokenSource.token,
      })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.error("Error:", err);
        }
      });

    return () => {
      cancelTokenSource.cancel("Component unmounted");
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Posts with CancelToken ({posts.length})</h3>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {posts.slice(0, 3).map((post) => (
          <div
            key={post.id}
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <h4>{post.title}</h4>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example 4: Axios instance with interceptors
function AxiosWithInstance() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://jsonplaceholder.typicode.com",
      timeout: 5000,
    });

    // Request interceptor
    api.interceptors.request.use(
      (config) => {
        console.log(`Making request to: ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    api.interceptors.response.use(
      (response) => {
        console.log(`Response received: ${response.status}`);
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    api
      .get<Post[]>("/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Posts using Axios Instance ({posts.length})</h3>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {posts.slice(0, 5).map((post) => (
          <div
            key={post.id}
            style={{
              padding: "1rem",
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <h4>{post.title}</h4>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main component
function AxiosExample() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Axios Examples</h1>
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Example 1: Basic Axios</h2>
        <AxiosBasic />
      </div>
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Example 2: Async/Await</h2>
        <AxiosAsync />
      </div>
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Example 3: With CancelToken</h2>
        <AxiosWithCancel />
      </div>
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Example 4: Axios Instance with Interceptors</h2>
        <AxiosWithInstance />
      </div>
    </div>
  );
}

export default AxiosExample;

