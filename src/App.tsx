import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import JSX from './snippets/jsx'
import Counter from './snippets/counter'
import Todo from './snippets/todo'
import TodoObj from './snippets/todo-obj'
import UseWindowSizeDemo from './snippets/hooks/usewindowsize-demo'
import TaskManagement from './coding-test/sqor-ai/task-management'
import BooksApp from './coding-test/jpmc/books-app'
function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/jsx" replace />} />
          <Route path="/jsx" element={<JSX />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/todo-obj" element={<TodoObj />} />
          <Route path="/use-window-size" element={<UseWindowSizeDemo />} />
          <Route path="/task-management" element={<TaskManagement />} />
          <Route path="/books-app" element={<BooksApp />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
