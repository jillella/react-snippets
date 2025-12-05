import { useState, useEffect } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Example 1: Basic fetch with useState and useEffect
function FetchBasic() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data: Post[]) => {
        setPosts(data);
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

// Example 2: Fetch with async/await
function FetchAsync() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: Post[] = await response.json();
        setPosts(data);
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

// Example 3: Fetch with abort controller (cleanup)
function FetchWithAbort() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/posts", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error:", err);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Posts with AbortController ({posts.length})</h3>
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

// Main component
function FetchExample() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Fetch API Examples</h1>
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Example 1: Basic Fetch</h2>
        <FetchBasic />
      </div>
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Example 2: Async/Await</h2>
        <FetchAsync />
      </div>
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Example 3: With AbortController</h2>
        <FetchWithAbort />
      </div>
    </div>
  );
}

export default FetchExample;

