import app from './app'
import { logger } from './utils'

const server = app.listen(app.get('port'), () => {
  logger.info(
    'App running on port %d in %s mode',
    app.get('port'),
    app.get('env')
  )
})

export default server
