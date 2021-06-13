import { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask'

const initialState = [
   
]

function App() {
  const [tasks, setTasks] = useState(initialState)
  const [showAddTask, setShowAddTask] = useState(false)

  const onAdd = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1

    const newTask = { id, ...task}
    setTasks([...tasks, newTask])
  }

  useEffect(() => {
   const getTasks = async () => {
     const response = await fetchTasks()
     setTasks(response)
   }
   getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:4000/tasks')
    const data = await res.json()
    return data
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }
  return (
    <div className="container">
      <Header 
      title="Task Tracker" 
      onAddBtn={() => setShowAddTask(!showAddTask)}
      showAdd={!showAddTask}/>
      {showAddTask && <AddTask onAdd={onAdd}/> }
      {tasks.length > 0 ? <Tasks onToggle={toggleReminder} tasks={tasks} onDelete={deleteTask} /> : 'No Tasks to show!'}
    </div>
  );
}

export default App;
