const readline = require('readline')
const fs = require('fs')

const SRC = './src'

const TARGET_TEMPLATE = 'index.mustache'

// default email template if user doesn't give any default template
const EMAIL_TEMPLATE = `<!doctype html>
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

const DEFAULT_CONFIG = {
  inject: {
    frontString: [],
    endString: [],
  },
}

const genConfigStr = (langArray) => {
  return JSON.stringify(
    {
      ...DEFAULT_CONFIG,
      langs: langArray,
    },
    null,
    2
  )
}

const DEFAULT_LANG = {
  user: 'world',
}

const genLangObjStr = (langStr) => {
  return JSON.stringify(
    {
      ...DEFAULT_LANG,
      lang: langStr,
    },
    null,
    2
  )
}

const langJsonPath = (folderPath, langStr) => {
  return `${folderPath}/${langStr}.json`
}

console.log('[START] gen basic files....')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question(
  'Please input your folder name (project name or issue number): ',
  (folderName) => {
    // check the folder if exist or empty
    const folderPath = `${SRC}/${folderName}`
    if (fs.existsSync(folderPath)) {
      console.error(
        `[ERROR] Folder: ${folderName} has existed, you should choose another one.`
      )
      rl.close()
    } else {
      // create folder
      console.log('[CREATE] folder ', folderName)
      fs.mkdir(folderPath, (err) => {
        if (err) {
          console.error(`[ERROR] Create folder ${folderName} failed: ${err}`)
          rl.close()
        }
        console.log(`[INFO] Folder ${folderName}  created.`)

        rl.question(
          'Use the common templates? If yes, input your common template folder name: ',
          (commonTemplateFolderName) => {
            if (!commonTemplateFolderName) {
              // use the default generate rule
              rl.question(
                'What default language do you want add? (default: en)',
                (defaultLang) => {
                  const lang = defaultLang === '' ? 'en' : defaultLang
                  console.log('your default lang is ', defaultLang)

                  const jsonPath = `${folderPath}/${lang}.json`
                  const configPath = `${folderPath}/config.json`

                  const templatePath = `${folderPath}/${TARGET_TEMPLATE}`

                  try {
                    fs.writeFileSync(jsonPath, genLangObjStr(lang), 'utf8')
                    console.log(`${jsonPath} created`)

                    fs.writeFileSync(configPath, genConfigStr([lang]), 'utf8')
                    console.log(`${configPath} created`)

                    fs.writeFileSync(templatePath, EMAIL_TEMPLATE, 'utf8')
                    console.log(`${templatePath} created`)
                  } catch (err) {
                    console.log(err)
                  }

                  rl.close()
                }
              )
            } else {
              // use the common template folder to generate the target template
              // check if this folder exists
              console.log('Common Template exists')
            }
          }
        )
      })
    }
  }
)
