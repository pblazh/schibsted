import { promisify } from 'util'
import { resolve } from 'path'
import { writeFile, readFile } from 'fs'

const writeToFile = promisify(writeFile)
const readFromFile = promisify(readFile)

export default path => ({
  save: content =>
    writeToFile(resolve(__dirname, '../fixtures', `${path}.json`), JSON.stringify(content, null, 2)),

  read: () =>
    readFromFile(resolve(__dirname,'../fixtures', `${path}.json`), 'utf8').then(d => JSON.parse(d.toString())),
});
