import { useState,useEffect, use } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task,setTasks]=useState([]);
  const [title,setTitle]=useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const getTasks=async()=>{
    const res=await axios.get(`${API_URL}/api/tasks`);
    setTasks(res.data);
    
  };
  const createTask=async()=>{
    if(!title) return;
    await axios.post(`${API_URL}/api/tasks`,{title});
    setTitle("");
    getTasks();
  };
  const deleteTask=async(id)=>{
    await axios.delete(`${API_URL}/api/tasks/${id}`);
    getTasks();
  };

  useEffect(()=>{
    getTasks();
  },[]);
  return (
    <div>
      <h2>Task manager</h2>
      <input 
      type="text"
      value={title}
      placeholder="Enter task title"
      onChange={(e)=>setTitle(e.target.value)}
      />
      <button onClick={createTask}>Add</button>
      <ul>
        {task.map((task)=>{
          <li key={task_id}>
            {task.title}
            <button onClick={()=>deleteTask(task._id)}>Delete</button>
          </li>

        })}
      </ul>
          
    </div>
  );
}
export default App;

