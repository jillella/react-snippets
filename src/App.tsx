import './App.css'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './snippets/home'
import JSX from './snippets/jsx'
import Counter from './snippets/counter'
import Todo from './snippets/todo'
import TodoObj from './snippets/todo-obj'
import UseCallback from './snippets/react-hooks/useCallback'
import UseCallback2 from './snippets/react-hooks/useCallback2'
import UseContext from './snippets/react-hooks/useContext'
import UseEffect from './snippets/react-hooks/useEffect'
import UseMemo from './snippets/react-hooks/useMemo'
import UseRef from './snippets/react-hooks/useRef'
import UseReducer from './snippets/react-hooks/useReducer'
import UseState from './snippets/react-hooks/useState'
import UseWindowSizeDemo from './coding-test/smbc/usewindowsize-demo'
import TaskManagement from './coding-test/sqor-ai/task-management'
import BooksApp from './coding-test/jpmc/books-app'
function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jsx" element={<JSX />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/todo-obj" element={<TodoObj />} />
          <Route path="/use-callback" element={<UseCallback />} />
          <Route path="/use-callback-2" element={<UseCallback2 />} />
          <Route path="/use-context" element={<UseContext />} />
          <Route path="/use-effect" element={<UseEffect />} />
          <Route path="/use-memo" element={<UseMemo />} />
          <Route path="/use-ref" element={<UseRef />} />
          <Route path="/use-reducer" element={<UseReducer />} />
          <Route path="/use-state" element={<UseState />} />
          <Route path="/use-window-size" element={<UseWindowSizeDemo />} />
          <Route path="/task-management" element={<TaskManagement />} />
          <Route path="/books-app" element={<BooksApp />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
