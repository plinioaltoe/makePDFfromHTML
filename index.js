import config from 'config'
import app from 'app'

const server = app.listen(config.web.port, function() {
  console.log(
    'API %d.',
    config.web.port
  )
  console.log('Controle de atualização')
})

export default server
