import { useState } from 'react'
import styles from './task-management.module.css'

type Task = {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

const initialTasks: Task[] = [
  { id: 1, title: 'Complete project documentation', description: 'Write comprehensive documentation for the project', priority: 'high' },
  { id: 2, title: 'Review code changes', description: 'Review pull requests from team members', priority: 'medium' },
  { id: 3, title: 'Update dependencies', description: 'Check and update npm packages', priority: 'low' },
  { id: 4, title: 'Fix bug in login page', description: 'Resolve authentication issue', priority: 'high' },
  { id: 5, title: 'Design new feature mockup', description: 'Create UI mockups for upcoming feature', priority: 'medium' },
]

function TaskManagement() {
  // const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low')
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as 'low' | 'medium' | 'high')
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterPriority(e.target.value as 'all' | 'low' | 'medium' | 'high')
  }

  const handleAddTask = () => {
    if (title.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        title: title.trim(), 
        description: description.trim(), 
        priority 
      }])
      setTitle('')
      setDescription('')
      setPriority('low')
    }
  }
  return (
    <>
      {/* 
      You are tasked to create a Task Management Dashboard using React and TypeScript. Users should be able to: 
      1. Add new tasks with a title, description, and priority (low, medium, high). 
      2. View all tasks in a list or grid view. 
      3. Filter tasks based on priority. 
      Responsive Design: The dashboard must be fully responsive and work on devices of various screen sizes (mobile, tablet, desktop).
       */}

       <div className={styles.dashboard}>
        <h1 className={styles['dashboard-title']}>Task Management Dashboard</h1>
        <div className={styles['task-form']}>
          <input 
            type="text" 
            placeholder="Title" 
            value={title}
            onChange={handleTitleChange}
            className={styles['form-input']}
          />
          <input 
            type="text" 
            placeholder="Description" 
            value={description}
            onChange={handleDescriptionChange}
            className={styles['form-input']}
          />
          <select value={priority} onChange={handlePriorityChange} className={styles['form-select']}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleAddTask} className={styles['btn-add']}>Add Task</button>
        </div>
      </div>
      <div className={styles['tasks-section']}>
        <div className={styles['tasks-header']}>
          <h2>Tasks</h2>
          <select value={filterPriority} onChange={handleFilterChange} className={styles['filter-select']}>
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className={styles['table-container']}>
          <table className={styles['tasks-table']}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {tasks
                .filter((task) => filterPriority === 'all' || task.priority === filterPriority)
                .map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      <span className={`${styles['priority-badge']} ${styles[`priority-${task.priority}`]}`}>
                        {task.priority}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TaskManagement
