import fs from 'fs'

const header = fs.readFileSync('./assets/header.wav')

const writeSerumWavetableFile = function(tableData, fileName = 'test') {
  const waveSampleCount = tableData[0].length
  const outFileBufferArray = [Buffer.from(header)]
  tableData.map((w, v) => {
    const wbuf = Buffer.allocUnsafe(4 * waveSampleCount).fill(0)
    w.map((s, x) => wbuf.writeFloatLE(s, x * 4))
    outFileBufferArray.push(wbuf)
  })
  const length = outFileBufferArray.reduce((total, buf) => total + buf.length, 0)
  outFileBufferArray[0].writeInt32LE(length - 8, 4)
  outFileBufferArray[0].writeInt32LE(length - outFileBufferArray[0].length, 132)
  !fs.existsSync(`./waves`) && fs.mkdirSync(`./waves`)
  fs.writeFile(`./waves/${fileName}.wav`, Buffer.concat(outFileBufferArray), function(e) {
    e && console.error(e)
  })
}

export default writeSerumWavetableFile
