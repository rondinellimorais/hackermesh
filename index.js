// === Imports
// ==================================================
global.http = require('http')
global.express = require('express')
global.app = express()
global.extend = require('node.extend')
global.url = require('url')
global.stringify = require('json-stringify-safe')
global.path = require('path')
global.fs = require('fs')
global.bodyParser = require('body-parser')
global.bodyParser = require('body-parser')
global.argv = require('minimist')(process.argv.slice(2))
global.chromedriver = require('chromedriver')
global.chrome = require('selenium-webdriver/chrome');

// === constants
// ==================================================
var SERVER_PORT = 3000

// verifica se porta foi especificada
if (argv.p) {
	SERVER_PORT = parseInt(argv.p)
}

// === Initialize server
// ==================================================
app.set('port', process.env.PORT || SERVER_PORT)
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())// parse de request.body to json

// Configure routers
// ==================================================
require('./controller/MainController.js')
require('./util/Util.js')

// === Start Server
http.createServer(app).listen(SERVER_PORT, function () {

	console.log('[' + (new Date().toString()) + '] Server is running...')

	// verifica se linguagem foi especificada
	selectLang()

	// inicia
	MainController.init()
})

function selectLang() {

	if (argv.l) {
		LANGUAGE_PROFICIENCY.map((item) => {
			if (item.key === argv.l) {
				console.log("\nLanguage selected")
				console.log("=========================")
				console.log(item.name)
				global.selectedLanguage = item
			}
		})
	}
}