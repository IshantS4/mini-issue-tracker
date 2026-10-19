import express from 'express'
import cors from "cors"
import issueRoutes from './routes/issueRoutes.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/issues",issueRoutes)
app.get('/', (req,res) =>{
    res.send("Hello World")
})
app.listen(8000,() =>{
    console.log("The server is running on PORT 8000")
})