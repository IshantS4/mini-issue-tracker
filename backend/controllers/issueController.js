import pool from "../utils/db.js";
export const getIssues = async (req,res) =>{
    try{
        const result = await pool.query(
            "SELECT * FROM issues"
        )
        res.status(200).json(result.rows)
    }
    catch(error){
        console.error("Error Occured",error)
        res.status(500).json({error : "Could not work properly : "})
    }
}
export const createIssues = async(req,res) => {
  try{
      const { title, description, type, priority } = req.body;
      if(!title || !description || !type || !priority){
       return res.status(400).json({error : "All fields are required"})
      }
    const result =  await pool.query(
        "INSERT INTO issues (title, description, type, priority, status) values ($1,$2,$3,$4,$5) RETURNING *",[title, description, type, priority, "open"]
    )
    res.status(201).json(result.rows[0])
  }
catch(error){
    console.error("Error Occured",error)
    res.status(500).json({error : "Could not store the data properly"})

}
}
export const updateIssue = async(req,res) => {
    try{
        const id = req.params.id
        const {title, description, type, priority, status}= req.body
        const result = await pool.query(
            "UPDATE issues SET title = $1, description = $2, type = $3, priority = $4, status = $5 WHERE id = $6 RETURNING *",[title, description, type, priority, status, id]
        )
         if (result.rows.length === 0) {
      return res.status(404).json({ error: "Issue not found" });
    }
        res.status(200).json(result.rows[0])
    }
    catch(error){
        res.status(500).json({error : "Error! Could not update data"})
    }
} 
export const deleteIssues = async(req,res) => {
   try{
     const id = req.params.id
    const result = await pool.query(
        "DELETE from issues WHERE id= $1 RETURNING *",[id]
    )
    if(result.rows.length === 0){
      return  res.status(404).json({error : "Issue not found"})
    }
    res.status(200).json(result.rows[0])
   }
catch(error){
    console.error("Error Occured",error)
    res.status(500).json("Issue could not be deleted")
}
}