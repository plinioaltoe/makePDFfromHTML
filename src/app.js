import express from 'express'
import { existsSync } from 'fs'
import RepositorioSingleton from 'repositorio-provas'

const app = express()
const repProva = RepositorioSingleton.getInstance()

app.get('/', function(req, res) {
  res.send('Bem vindo a API para geração de provas em PDF =)')
})

app.get('/download/:id', function(req, res) {
  const prova = repProva.getProvaById(req.params.id)

  if (prova && existsSync(prova.localPath)) {
    res.download(prova.localPath)
    repProva.atualizarStatus(req.params.id, repProva.status.DOWNLOADED)
  } else {
    const resposta = { error: 'Arquivo não encontrado', cod: 404 }
    res.setHeader('Content-Type', 'application/json')
    res.status(404).send(JSON.stringify(resposta))
  }
})

export default app
