import * as fs from 'fs'
import * as path from 'path'
import logger from './logger'

export default () => {
  const configSource = process.env.CONFIG_SOURCE
  try {
    const configFilePath = path.join(
      __dirname,
      `../configs/config-${configSource}.json`
    )
    return JSON.parse(fs.readFileSync(configFilePath, { encoding: 'utf8' }))
  } catch (e) {
    logger.error(`Cannot read config source: ${configSource}`)
  }
  return null
}
