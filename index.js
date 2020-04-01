const fs = require('fs')
const util = require('util')
const execFile = util.promisify(require('child_process').execFile)
const async = require('async')
const data1 = require("./data1.json").meta
const data2 = require("./data2.json").meta
const data = data1.concat(data2)

async.eachSeries(data, async function (d) {
	const name = d.title.replace(/ /g, '_')
	const dst_path = './dest/' + name + '.mp4'
	const dst_path_mp3 = './dest/' + name + '.mp3'

	console.log(name, d.movie_url.mb_lq)

	if (!fs.existsSync(dst_path)) {
		await execFile('ffmpeg', ['-i', d.movie_url.mb_lq, '-c', 'copy', '-bsf:a', 'aac_adtstoasc', dst_path])
	}
	if (!fs.existsSync(dst_path_mp3)) {
		await execFile('ffmpeg', ['-i', dst_path, '-acodec', 'libmp3lame', '-ab', '256k', dst_path_mp3])
	}
})
