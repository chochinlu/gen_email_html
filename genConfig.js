const readline = require('readline')
const fs = require('fs')

const emailTemplate = `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Sample</title>
</head>
<body>
<h1>Hello {{user}}</h1>
</body>
</html>
`

console.log('gen basic configs')

const SRC = './src'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question(
  'Input your folder name? (project name or issue number): ',
  folderName => {
    console.log('your folder name is ', folderName)

    // check the folder if exist or empty
    const folderPath = `${SRC}/${folderName}`
    if (fs.existsSync(folderPath)) {
      console.log('Folder has existed, you should choose another one.')
      rl.close()
    } else {
      // create folder
      console.log('create folder: ', folderName)
      fs.mkdir(folderPath, err => {
        if (err) {
          console.log('Create folder failed: ', err)
          rl.close()
        }
        console.log('Folder created.')

        rl.question(
          'What default language do you want add? (default: en)',
          defaultLang => {
            const lang = defaultLang === '' ? 'en' : defaultLang
            console.log('your default lang is ', defaultLang)

            const jsonPath = `${folderPath}/${lang}.json`
            const defaultLangJsonObj = { lang, user: 'world' }

            const configPath = `${folderPath}/config.json`
            const defaultConfigObj = {
              langs: [lang],
              inject: {
                frontString: [],
                endString: []
              }
            }

            const templatePath = `${folderPath}/email.mustache`

            try {
              fs.writeFileSync(
                jsonPath,
                JSON.stringify(defaultLangJsonObj, null, 2),
                'utf8'
              )
              console.log(`${jsonPath} created`)

              fs.writeFileSync(
                configPath,
                JSON.stringify(defaultConfigObj, null, 2),
                'utf8'
              )
              console.log(`${configPath} created`)

              fs.writeFileSync(templatePath, emailTemplate, 'utf8')
              console.log(`${templatePath} created`)
            } catch (err) {
              console.log(err)
            }

            rl.close()
          }
        )
      })
    }
  }
)
