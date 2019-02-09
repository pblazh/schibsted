import { filter, replace, nextId, without } from './util'
import { read, save } from './db'

export const STATES = {
  default: 'open',
  open: 'open',
  pending: 'pending',
  closed: 'closed'
}

const Issue = ({ title, description }) => ({
  id: null,
  title,
  description,
  state: STATES.default
})

// state machine
export const changeState = (state, issue) => {
  if (
    (issue && state === STATES.pending && issue.state === STATES.open) ||
    (issue && state === STATES.closed && issue.state === STATES.pending)
  ) {
    return { ...issue, state }
  }
  return issue
}

const getOne = id => filter({ id: parseInt(id, 10) })
const omit = id => without({ id })

const change = (state, id) => async db => {
  const theOne = getOne(id)(db)[0]
  const changed = changeState(state, theOne)
  const newDb = replace(changed)(db)
  await save(newDb)
  return changed
}

const create = issue => async db => {
  const newIssue = { ...Issue(issue), id: nextId(db) }
  await save([...db, newIssue])
  return newIssue
}

const remove = id => async db => {
  const after = omit(parseInt(id, 10))(db)
  await save(after)
  return db.length - after.length
}

export default {
  all: () => read(),
  one: id => read().then(getOne(id)),
  open: () => read().then(filter({ state: STATES.open })),
  pending: () => read().then(filter({ state: STATES.pending })),
  closed: () => read().then(filter({ state: STATES.closed })),
  change: (state, id) => read().then(change(state, id)),
  create: issue => read().then(create(issue)),
  remove: id => read().then(remove(id))
}
