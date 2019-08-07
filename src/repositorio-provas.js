import { unlinkSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import findRemoveSync from 'find-remove'
import config from './config'

class Repository {
  constructor() {
    this.localPath = join(__dirname, '../output/')
    this.repositorio = new Map()
    this.status = {
      NOVO: 'NOVO',
      DOWNLOADED: 'DOWNLOADED',
    }

    this.initializateOutputDirectory()

    console.log(`Starting monitoring for each ${config.monitoramento_expiracao_minutos} minute(s)`)
    this.intervalId = setInterval(() => this.removerProvasExpiradas(), config.monitoramento_expiracao_minutos * 60)
  }

  getProvaById(id) {
    return this.repositorio.get(id.toString())
  }

  atualizarStatus(id, status) {
    var idInt = id.toString()
    const prova = this.repositorio.get(idInt)
    if (prova) {
      prova.status = status
      prova.lastUpdate = Date.now()
      this.repositorio.set(idInt, prova)
    }
  }

  removerProvasExpiradas() {
    for (var [key, value] of this.repositorio) {
      if (this.isExpired(value)) {
        console.log(`File ${value.localPath} expired! It'll be removed.`)
        try {
          unlinkSync(value.localPath)
          this.repositorio.delete(key)
          console.log(`Success deleting ${value.localPath}`)
        } catch (err) {
          console.error(`Fail trying delete file ${value.localPath}.`)
          console.error(err)
        }
      }
    }
  }

  isExpired(prova) {
    const gatePosDownload = config.expired_time_pos_donwload_minutes * 60 * 1000
    const gateExpiration = config.expired_time_minutes * 60 * 1000
    const timeAtual = Date.now()

    const condicao1 = prova.lastUpdate < timeAtual - gatePosDownload && prova.status === this.status.DOWNLOADED
    const condicao2 = prova.criacao < timeAtual - gateExpiration

    return condicao1 || condicao2
  }

  initializateOutputDirectory() {
    if (!existsSync(this.localPath)) {
      console.log(`Directory ${this.localPath} doesn't and will be created.`)
      mkdirSync(this.localPath)
    }

    this.removeOldFiles()
  }

  removeOldFiles() {
    console.log(`Cleaning output directory: ${this.localPath}`)
    findRemoveSync(this.localPath, {
      extensions: ['.pdf', '.PDF', '.png', '.PNG'],
    })
  }

  stopMonitoring() {
    console.log(`Stop monitoring ID ${this.intervalId}.`)
    clearInterval(this.intervalId)
  }
}

let instance

class RepositorySigleton {
  static getInstance() {
    if (!instance) {
      instance = new Repository()
    }

    return instance
  }
}

export default RepositorySigleton
