import express from 'express'
import cors from "cors";
import bodyParser from 'body-parser'
import issuesRouter from './issueTracker'

const app = express()
app.set('port', process.env.PORT || 5000)
app.use(bodyParser.json())
app.use(cors())
app.use('/api', issuesRouter)

export default app
