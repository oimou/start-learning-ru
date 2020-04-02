const fs = require('fs')
const path = require('path')
const util = require('util')
const execFile = util.promisify(require('child_process').execFile)
const async = require('async')
const data1 = require("./data1.json").meta
const data2 = require("./data2.json").meta
const data = data1.concat(data2)
const dst = path.join(__dirname, "dest")

if (!fs.existsSync(dst)) fs.mkdirSync(dst)

async.forEach(data, async function (d) {
	const name = d.title.replace(/ /g, '_')
	const dst_path_mp3 = path.join(__dirname, 'dest', name + '.mp3')

	console.log(name, d.movie_url.mb_lq)

	if (!fs.existsSync(dst_path_mp3)) {
		await execFile('ffmpeg', ['-i', d.movie_url.mb_lq, '-acodec', 'libmp3lame', '-ab', '256k', dst_path_mp3])
	}
})
