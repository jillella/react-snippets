import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import JSX from './snippets/jsx'
import Counter from './snippets/counter'
import Todo from './snippets/todo'
import TodoObj from './snippets/todo-obj'

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
        </Routes>
      </main>
    </div>
  )
}

export default App
