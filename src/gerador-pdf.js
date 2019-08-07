import puppeteer from 'puppeteer'

var instance

class GeradorPdf {
  constructor(browser) {
    this.browser = browser
  }

  async gerarPdf(html, pathArquivo) {
    console.log(html)

    let { htmlCorpo } = html
    let page = await this.browser.newPage()
    await page.goto(`data:text/html,${htmlCorpo}`, {
      waitUntil: 'networkidle0',
    })

    let objetoParaGerarPdf = {
      path: pathArquivo,
      displayHeaderFooter: true,
      headerTemplate: '<h1>HEADER OF PDF - ITs EDITABLE</h1>',
      footerTemplate: '<h1>FOOTER OF PDF - ITs EDITABLE</h1>',
      margin: {
        top: '2cm',
        bottom: '1.5cm',
        right: '2cm',
        left: '2cm',
      },
      printBackground: true,
      format: 'A4',
    }

    await page.pdf(objetoParaGerarPdf)

    page.close()
  }

  async close() {
    await this.browser.close()
  }
}

class GeradorPdfSigleton {
  static async getInstance() {
    if (!instance) {
      try {
        const browser = await puppeteer.launch()
        instance = new GeradorPdf(await Promise.resolve(browser))
      } catch (e) {
        console.log('Unable to launch browser mode in sandbox mode. Lauching Chrome without sandbox.')
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
        instance = new GeradorPdf(await Promise.resolve(browser))
      }
    }
    return instance
  }
}

export default GeradorPdfSigleton
