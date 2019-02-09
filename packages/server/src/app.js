import express from 'express'
import bodyParser from 'body-parser'
import issuesRouter from './issueTracker'

const app = express()
app.set('port', process.env.PORT || 5000)
app.use(bodyParser.json())
app.use('/api', issuesRouter)

export default app
