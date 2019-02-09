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

export const issues = fetchJSON(config.issues)
