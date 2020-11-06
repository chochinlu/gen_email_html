# Html Email Generator

Here is a simple script for generating html email. 

## Features 

- use [mustache](https://mustache.github.io/) to generate email html template.
- you don't need to write inline style hard code, just use `<style></style>` block or import css file.
- use config and language jsons to generate multi-language email htmls at once.
- minify the html result.
- pre-append/ post-append string between your final html string (for example: sql statements)
- live-reload development

# Usage 

First create a folder at `src` folder, you can name your folder by your project name or issue number, 
for example: `issue999`.

The file structure will look like this: 

```
issue999
  - [image folder]
  - config.json
  - en.json
  - cn.json
  - email.mustache
```

### config.json 

Declare which language html files you want to generate, and the pre-appen/post-append stings.

for example: 

``` json
{
  "langs": ["en","cn"],
  "inject": {
    "frontString": [
       "INSERT INTO ...",
       "'; \n"
    ],
    "endString": [
       "SELECT * FROM ... \n"
    ]
  }
}
```

`lang` and `inject` parameters are required.

`lang` parameter declares which languages html email you want to generate.

if you dont want inject anything, just: 

``` json
{
  "inject": {
    "frontString":[],
    "endString":[]
  }
}
```

### email.mustache 

You can declare any name, but the file extension must be `.mustache`  ([Mustache syntax](https://mustache.github.io/mustache.5.html))

### [language].json

Depend on your `lang` defined on `config.json`

if you define `"lang":["en", "cn"]`, you should add two files: `en.json`, and `cn.json`

The json name should be the same as `lang` you defined in `config.json`

### output 

```$xslt
dist
  - [your source project folder name]
    -- [img folder]
    -- cn.html
    -- cn.sql
    -- en.html
    -- en.sql
```

### Npm commands 

First create the project source folder and json files: 

```$xslt
$ npm run gen
```

It will help you to create the basic `config.json`, `en.json` and `email.mustache`

You can check basic information you set: 

```$xslt
$npm run hello
```

Development: 

```
$ npm run watch [your source project folder name]
```

The target url will look like `localhost:3000/en.html` or `localhost:3000/cn.html`

Build final result:

```
$ npm run build [your source project folder name]
```
