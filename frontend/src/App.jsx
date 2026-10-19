import './App.css'
import { useState,useEffect } from "react"
import axios from "axios"
export default function App () {
  const [issues,setIssues] = useState([])
  const [error,setError] = useState("")
  const [load,setLoad] = useState(true)
  const [formData,setFormData] = useState({
    title: "",
    description: "",
    type: "bug",
    priority: "medium"
    
  })
     const fetchIssues = async() =>{
    try{
      const response = await axios.get("http://localhost:8000/api/issues")
      setIssues(response.data)
    }
    catch(error){
      setError("Error occured")
    }
    finally{
      setLoad(false)
    }
  }
  const handleDelete = async(id) =>{
try{
  const response = await axios.delete(`http://localhost:8000/api/issues/${id}`)
  await fetchIssues()
}
catch(error){
  console.log(error)
}
  }
 const handleUpdate = async (id, status) => {
  try {
    console.log("Updating issue:", id);
    console.log("New status:", status);

    const response = await axios.put(
      `http://localhost:8000/api/issues/${id}`,
      { status: status }
    );

    console.log("Server response:", response.data);

    await fetchIssues();
  } catch (error) {
    console.log("Update failed:", error.response?.data || error.message);
  }
};
 
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post("http://localhost:8000/api/issues",
        formData
      )
      setFormData({
  title: "",
  description: "",
  type: "bug",
  priority: "medium"
});
      console.log(response.data)
      await fetchIssues()
    }
    catch(error){
      console.log(error)
    }
  }
  
 useEffect(() =>{
  fetchIssues()
 },[])

 if(load){
  return <h2>Loading...</h2>
 }
 if(error){
  return <h2>{error}</h2>
 }
 return(
  <div className='container'>
    <h1>Issues Data</h1>
    <form className='issue-form' onSubmit={handleSubmit}>
      <input type="text"
      placeholder="Enter the issue"
      value={formData.title}
      onChange={(e) => setFormData({...formData,title: e.target.value})}
      required
      />
      <input type="text"
      placeholder="Enter the description"
      value={formData.description}
      onChange={(e) => setFormData({...formData,description: e.target.value})}
      required
       />
       <label>Type: </label>
       <select 
       value={formData.type}
       onChange={(e) => setFormData({...formData,type: e.target.value})}
       >
      <option value="bug">Bug</option>
      <option value="feature">Feature</option>
       </select>
       <label>Priority: </label>
       <select
       value={formData.priority}
       onChange={(e) => setFormData({...formData,priority: e.target.value})}
       >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
       </select>
       <button type="submit">Create issue</button>
    </form>
    {
      issues.map((issue) => {
        return <div className='issue-card' key={issue.id}>
          <h2>{issue.title}</h2>
          <p>{issue.description}</p>
          <h3>{issue.type}</h3>
          <h3>{issue.priority}</h3>
          <select defaultValue={issue.status}
          onChange={(e) => {
            handleUpdate(issue.id,e.target.value)
          }}
          >
  <option value="open">Open</option>
  <option value="in-progress">In Progress</option>
  <option value="resolved">Resolved</option>
</select>
          <p>{issue.created_at}</p>
          <p>{issue.id}</p>
          <button className='delete-button' onClick={() => handleDelete(issue.id)}>Delete issue</button>
        </div>
      })
    }
  </div>
 )
}