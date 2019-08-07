import { writeFileSync } from 'fs'

import geradorPdf from 'gerador-pdf'
import repositorioProvas from 'repositorio-provas'
import { compilarHtml } from 'gerador-html'

const geradorExemplo = ({ dados, template, nomeArquivo }) => {
  try {
    const { htmlCorpo } = compilarHtml({
      dados,
      template,
    })[0]
    //console.log(htmlCorpo)
    geradorPdf.getInstance().then(instancia => {
      repositorioProvas.getInstance().initializateOutputDirectory()
      writeFileSync(`output/${nomeArquivo}.html`, htmlCorpo, err => {
        if (err) {
          return console.log(err)
        }
      })
      instancia.gerarPdf({ htmlCorpo }, `output/${nomeArquivo}.pdf`).then(() => {
        console.log(`Arquivo ${nomeArquivo}.pdf gerado`)
        instancia.close()
        repositorioProvas.getInstance().stopMonitoring()
      })
    })
  } catch (err) {
    console.error(err)
  }
}

export default geradorExemplo
