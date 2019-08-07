import pug from 'pug'

export const compilarHtml = ({ dados, template, id, operacao }) => {
  console.log(`Generating html template ${template}.`)
  try {
    const compiledFunction = pug.compileFile(`template/${template}.pug`)
    return [
      {
        htmlCorpo: compiledFunction(dados),
      },
    ]
  } catch (err) {
    console.error(err)
    throw new Error('Fail to compile html')
  }
}
