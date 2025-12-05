import { Link, useLocation } from 'react-router-dom'

const snippets = [
  { path: '/jsx', name: 'JSX' },
  { path: '/counter', name: 'Counter' },
  { path: '/todo', name: 'Todo' },
  { path: '/todo-obj', name: 'Todo Object' },
  { path: '/use-state', name: 'useState' },
  { path: '/use-effect', name: 'useEffect' },
  { path: '/use-context', name: 'useContext' },
  { path: '/use-ref', name: 'useRef' },
  { path: '/use-window-size', name: 'Use Window Size' },
  { path: '/task-management', name: 'Task Management' },
  { path: '/books-app', name: 'Books App' },
]

function Sidebar() {
  const location = useLocation()

  return (
    <nav className="sidebar">
      <h2>
        <Link to="/">React Snippets</Link>
      </h2>
      <ul>
        {snippets.map((snippet) => (
          <li key={snippet.path}>
            <Link
              to={snippet.path}
              className={location.pathname === snippet.path ? 'active' : ''}
            >
              {snippet.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar

