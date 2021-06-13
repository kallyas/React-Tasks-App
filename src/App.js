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

    const addTask = async (task) => {
      const res = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      })

      const data = await res.json()
      setTasks([...tasks, data])
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

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`,
    {
      method: "DELETE"
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToggle = await fetchTask(id)
    const updateTask = {...taskToggle, reminder: !taskToggle.reminder}

    const res = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updateTask)
    })

    const data = await res.json()

    setTasks(tasks.map(task => task.id === id ? {...task, reminder: !data.reminder} : task))
  }
  return (
    <div className="container">
      <Header 
      title="Task Tracker" 
      onAddBtn={() => setShowAddTask(!showAddTask)}
      showAdd={!showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/> }
      {tasks.length > 0 ? <Tasks onToggle={toggleReminder} tasks={tasks} onDelete={deleteTask} /> : 'No Tasks to show!'}
    </div>
  );
}

export default App;
