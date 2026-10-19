import { createIssues,updateIssue,deleteIssues,getIssues } from "../controllers/issueController.js";
import express from "express"
const router = express.Router()
router.get('/',getIssues)
router.post('/',createIssues)
router.put('/:id',updateIssue)
router.delete('/:id',deleteIssues)
export default router