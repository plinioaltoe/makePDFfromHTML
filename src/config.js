export default {
  rabbit: {
    server_url: process.env.RABBIT_SERVER_URL || 'amqp://localhost',
    server_test_url: process.env.RABBIT_SERVER_TESTE_URL || 'amqp://localhost',
  },
  web: {
    protocolo: process.env.WEB_PROTOCOLO || 'http',
    port: process.env.WEB_PORT || 3000,
    hostname: process.env.API_HOSTNAME || 'localhost',
  },
  dir_output: 'output',
  expired_time_pos_donwload_minutes: process.env.TEMPO_EXPIRACAO_POS_DOWNLOAD_MINUTOS | 10,
  expired_time_minutes: process.env.TEMPO_EXPIRACAO_MINUTOS | 20,
  monitoramento_expiracao_minutos: process.env.MONITORAMENTO_EXPIRACAO_MINUTOS | 2,
}
