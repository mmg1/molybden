const puppeteer = require('puppeteer')
const fs = require('fs')
const glob = require('glob').sync
const path = require('path')
const serve = require('serve')
const port = process.env.PORT || 5000
const testFilesPath = process.env.DOMATO_DIR || './domato/dist'
const servePath = path.join(__dirname, '../', testFilesPath)
// run server
const server = serve(servePath, {
	port
})
const fuzzFiles = glob(`${testFilesPath}/*.html`).sort((a, b) => a - b)
;(async () => {
	// path to Chromium asan build
	// You can download chromium with asan at:
	// https://commondatastorage.googleapis.com/chromium-browser-asan/index.html
	const executablePath = `../asan-mac-release`
	const launchOptions = {
		// headless: false,
		// slowMo: 250
		executablePath,
		timeout: 10000
	}
	const browser = await puppeteer.launch(launchOptions)
	const page = await browser.newPage()
	for (filename of fuzzFiles) {
		const startedAt = Date.now()
		const filenameNoDirPrefix = filename.slice(
			filename.lastIndexOf('/') + 1,
			filename.length
		)
		const url = `http://127.0.0.1:${port}/${filenameNoDirPrefix}`
		console.log(url)
		try {
			await page.goto(url, {
				timeout: 6000,
				waitUntil: 'load'
			})
		} catch (e) {
			console.error(
				`ITSATRAP! http://localhost:${port}/${filenameNoDirPrefix}`,
				e
			)
		}
		console.log(`Exec time: ${(Date.now() - startedAt) / 1000}s`)
	}
	await browser.close()
	server.stop()
})()
