import { Router } from 'express'

// TODO: implement correct healthcheck
const generateHealthCheck = (req, res) => {
  res.json({ running: true })
}

const router = Router()
router.get('/health', generateHealthCheck)
export default router
