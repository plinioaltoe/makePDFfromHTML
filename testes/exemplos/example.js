import gerarExemplo from './gerador-exemplo'
import data from '../data/example.json'

gerarExemplo({
  dados: data,
  template: 'geral/example',
  nomeArquivo: 'example',
})
