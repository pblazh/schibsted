/* eslint-disable import/prefer-default-export */
import config from './config'

const fetchJSON = url => () =>
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(`Network error at ${url}`)
    })
    .catch(err => {
      return {
        error: err.message
      }
    })

const sendJSON = (url, method = 'POST') => data =>
  fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    method,
    mode: 'cors'
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(`Network error at ${url}`)
    })
    .catch(err => {
      return {
        error: true,
        message: err.message
      }
    })

export const issues = fetchJSON(config.issues)
export const issue = id => fetchJSON(config.issue.replace('<id>', id))
export const open = fetchJSON(config.open)
export const pending = fetchJSON(config.pending)
export const closed = fetchJSON(config.closed)
export const append = sendJSON(config.append)
export const remove = id => sendJSON(config.remove.replace('<id>', id), 'DELETE')()
export const setPending = id => sendJSON(config.setPending.replace('<id>', id), 'PUT')()
export const setClosed = id => sendJSON(config.setClosed.replace('<id>', id), 'PUT')()
