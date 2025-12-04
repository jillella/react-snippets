import { Link, useLocation } from 'react-router-dom'

const snippets = [
  { path: '/jsx', name: 'JSX' },
  { path: '/counter', name: 'Counter' },
  { path: '/todo', name: 'Todo' },
  { path: '/todo-obj', name: 'Todo Object' },
]

function Sidebar() {
  const location = useLocation()

  return (
    <nav className="sidebar">
      <h2>React Snippets</h2>
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

