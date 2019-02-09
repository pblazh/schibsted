import { Router } from 'express'
import M, { STATES } from './model'

// TODO: implement correct healthcheck
const generateHealthCheck = (req, res) => {
  res.json({ running: true })
}

const sendJSON = (res, p) =>
  p.then(data => res.json(data), () => res.status(500).json({ error: 500 }))

const router = Router()
router.get('/health', generateHealthCheck)
router.get('/issues', (_, res) => sendJSON(res, M.all()))
router.post('/issues', ({ body: issue }, res) => sendJSON(res, M.create(issue)))
router.get('/issues/open', (_, res) => sendJSON(res, M.open()))
router.get('/issues/pending', (_, res) => sendJSON(res, M.pending()))
router.get('/issues/closed', (_, res) => sendJSON(res, M.closed()))
router.get('/issues/:id', ({ params: { id } }, res) => sendJSON(res, M.one(id)))
router.put('/issues/:id/pending', ({ params: { id } }, res) =>
  sendJSON(res, M.change(STATES.pending, id))
)
router.put('/issues/:id/closed', ({ params: { id } }, res) =>
  sendJSON(res, M.change(STATES.closed, id))
)
router.delete('/issues/:id', (req, res) =>
  sendJSON(res, M.remove(req.params.id).then(removed => ({ removed })))
)

router.get('/*', (_, res) => res.status(404).json({ error: 404 }))

export default router
