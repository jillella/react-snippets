import { Link, useLocation } from 'react-router-dom'
import styles from './sidebar.module.css'

const categories = [
  {
    title: 'React Hooks',
    items: [
      { path: '/use-state', name: 'useState' },
      { path: '/use-effect', name: 'useEffect' },
      { path: '/use-context', name: 'useContext' },
      { path: '/use-ref', name: 'useRef' },
      { path: '/use-reducer', name: 'useReducer' },
      { path: '/use-callback', name: 'useCallback' },
      { path: '/use-callback-2', name: 'useCallback 2' },
      { path: '/use-memo', name: 'useMemo' },
    ],
  },
  {
    title: 'Custom Hooks',
    items: [
      { path: '/use-fetch', name: 'useFetch' },
      { path: '/use-window-size', name: 'useWindowSize' },
    ],
  },
  {
    title: 'Examples',
    items: [
      { path: '/jsx', name: 'JSX' },
      { path: '/counter', name: 'Counter' },
      { path: '/todo', name: 'Todo' },
      { path: '/todo-obj', name: 'Todo Object' },
      { path: '/redux', name: 'Redux' },
    ],
  },
  {
    title: 'Coding Test',
    items: [
      { path: '/task-management', name: 'Task Management' },
      { path: '/books-app', name: 'Books App' },
    ],
  },
]

function Sidebar() {
  const location = useLocation()

  return (
    <nav className={styles.sidebar}>
      <h2>
        <Link to="/">React Snippets</Link>
      </h2>
      {categories.map((category) => (
        <div key={category.title} className={styles.section}>
          <h3 className={styles.sectionTitle}>{category.title}</h3>
          <ul>
            {category.items.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default Sidebar

