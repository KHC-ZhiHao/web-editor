const program = require('commander')
const modules = {
    fs: require('fs'),
    aws: require('aws-sdk'),
    request: require('request'),
    express: require('express'),
    bodyParser: require('body-parser'),
    parseXML: require('xml2js').parseString,
    chineseConv: require('chinese-conv')
}

modules.parseXML(modules.fs.readFileSync('../ad-simple.xml', 'utf8'), (err, result) => {
    modules.fs.writeFileSync('test.json', JSON.stringify(result, null, 4))
})

program
    .option('-p, --port <port>', 'Your port.')
    .parse(process.argv)

modules.aws.config.update({region:'us-east-1'})

let app = modules.express()
let url = 'localhost'
let port = program.port || '7777'
let service = 'gcp'
let gcpKey = ''
let awsTranslate = null
let contentPrefixName = ''
let supportLangs = ['en', 'en-us', 'zh-tw', 'zh-TW', 'zh', 'zh-cn', 'zh-CN']
let serviceOptions = ['aws', 'gcp']
let langOptions = ['en', 'zh-TW', 'zh-CN']

let mapping = {
    'en-us': 'en',
    'zh-tw': 'zh-TW',
    'zh': 'zh-CN',
    'zh-cn': 'zh-CN'
}

//backup
let files = modules.fs.readdirSync('./').filter((fileName) => {
    let [name, ext] = fileName.split('.')
    if (ext !== 'js' && ext !== 'json' && name !== '_backup') {
        throw new Error('有檔案不是JS，請找到正確資料夾好不')
    }
    return ext === 'js' || ext === 'json'
})

try {
    modules.fs.mkdirSync('_backup')
} catch(e) {}

for (let fileName of files) {
    modules.fs.writeFileSync(`./_backup/${fileName}`, modules.fs.readFileSync('./' + fileName, 'utf8'))
}
app.use(modules.bodyParser.json())
app.get('/', (request, response)=>{
    response.writeHeader(200, {'Content-Type':'text/html'})
    response.write(modules.fs.readFileSync(`${__dirname}/static/index.html`, 'utf8'))
    response.end()
})


app.post('/syncFiles', async function(req, res) {
    let data = req.body.data
    for (let dir of files) {
        let [fileName] = dir.split('.')
        let key = getMappingKey(fileName)
        modules.fs.writeFileSync(`${modulePath}/${dir}`, contentPrefixName + JSON.stringify(data[key], null, 4).replace(/'/g, '\\\'').replace(/"/g, '\'') + '\n')
    }
    res.status(200).send()
})

// http://localhost:3064/translation?text=測試&target=en
app.get('/translation', async function(req, res) {
    let text = req.query.text || ''
    let source = req.query.source
    let target = req.query.target
    if (text === '') {
        return res.status(200).send(text)
    }
    if (source === 'zh-TW' && target === 'zh-CN') {
        return res.status(200).send(modules.chineseConv.sify(text))
    }
    if (source === 'zh-CN' && target === 'zh-TW') {
        return res.status(200).send(modules.chineseConv.tify(text))
    }
    let result = await translation(text, source, target)
    res.status(200).send(result)
})

app.get('/getFiles', async function(req, res) {
    let data = {}
    for (let dir of files) {
        let [fileName, ext] = dir.split('.')
        if (supportLangs.includes(fileName)) {
            let content = modules.fs.readFileSync(`./${dir}`, 'utf8')
            if (ext === 'json') {
                data[getMappingKey(fileName)] = JSON.parse(content)
            } else {
                eval('data[getMappingKey(fileName)] =' + content.replace(contentPrefixName, ''))
            }
        }
    }
    res.status(200).json(data)
})

app.get('/syncFiles', async function(req, res) {
    let data = JSON.parse(req.query.data)
    for (let dir of files) {
        let [fileName] = dir.split('.')
        let key = getMappingKey(fileName)
        modules.fs.writeFileSync(dir, contentPrefixName + JSON.stringify(data[key], null, 4).replace(/'/g, '\\\'').replace(/"/g, '\'') + '\n')
    }
    res.status(200).send()
})

app.get('/langOptions', async function(req, res) {
    res.status(200).json(langOptions)
})

app.get('/serviceOptions', async function(req, res) {
    res.status(200).json(serviceOptions)
})

app.get('/setConfig', async function(req, res) {
    gcpKey = req.query.gcpKey
    service = req.query.service
    contentPrefixName = req.query.contentPrefixName
    if (service === 'aws') {
        awsTranslate = new modules.aws.Translate({ apiVersion: '2017-07-01' })
    }
    res.status(200).send()
})

app.get('/getTalk', async function(req, res) {
    let text = req.query.text
    let language = req.query.language
    if (text && language) {
        missGoogle(text, language)
            .then(() => {
                res.status(200).send()
            })
    }
})

app.use('/', modules.express.static(`${__dirname}/static`))
app.listen(port, function () {
    console.log(`< http://${url}:${port} >`)
})

function getMappingKey(key) {
    return mapping[key] || key
}

function missGoogle(text, language){
    return new Promise((resolve, reject) => {
        var src = 'https://translate.google.com/translate_tts?ie=UTF-8&total=1&client=tw-ob'
        var query = '&q=' + encodeURIComponent(text) + '&tl=' + language || 'en-gb'
        modules
            .request
            .get(src + query)
            .pipe(modules.fs.createWriteStream(`${__dirname}/static/sound.mp3`))
            .on('finish', () => {
                resolve()
            })
    })
}

function translation(text, source, target) {
    return new Promise((resolve, reject) => {
        if (service === 'gcp' && gcpKey) {
            modules.request({
                uri: 'https://translation.googleapis.com/language/translate/v2',
                method: 'POST',
                qs: {
                    q: text,
                    key: gcpKey,
                    format: 'text',
                    source,
                    target
                }
            }, (e, r, body) => {
                let output = ''
                try {
                    output = JSON.parse(body).data.translations[0].translatedText
                } catch (error) {
                    output = ''
                }
                resolve(output)
            })
        }
        if (service === 'aws') {
            let params = {
                SourceLanguageCode: source,
                TargetLanguageCode: target,
                Text: text
            }
            awsTranslate.translateText(params).promise().then(({ TranslatedText }) => {
                resolve(TranslatedText)
            })
        }
    })
}
