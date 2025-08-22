import { useState,useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [task,setTasks] = useState([]);
  const [title,setTitle] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const getTasks = async()=> {
    const res = await axios.get(`${API_URL}/api/tasks`);
    setTasks(res.data);

  };
  const createTask = async()=> {
    if (!title) return;
    await axios.post(`${API_URL}/api/tasks`,{title});
    setTitle("");
    getTasks();
  
  };
  const deleteTask = async(id) => {
    await axios.delete(`${API_URL}/api/tasks/${id}`);
    getTasks();
  }
  useEffect(() => {
    getTasks();
  },[]);
  return(
    <div>
      <h2>TASK MANAGER</h2>
      <input 
      type="text"
      value = {title} 
      placeholder="ENTER THE TASK"
      onChange={(e)=>setTitle(e.target.value)}
      />
      <button onClick={createTask}> ADD</button>
      <ul>
  {Array.isArray(task) && task.map((task) => (
    <li key={task._id}>
      {task.title}
      <button onClick={() => deleteTask(task._id)}> DELETE</button>
    </li>
    ))}
     </ul>
    </div>
  );

}
export default App;