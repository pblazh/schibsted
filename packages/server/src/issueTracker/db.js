import { promisify } from 'util'
import { resolve } from 'path'
import { writeFile, readFile } from 'fs'

const DB_PATH = resolve(__dirname, './db.json')

const writeToFile = promisify(writeFile)
const readFromFile = promisify(readFile)

export const save = content =>
  writeToFile(DB_PATH, JSON.stringify(content, null, 2))

export const read = () =>
  readFromFile(DB_PATH, 'utf8').then(d => JSON.parse(d.toString()))
