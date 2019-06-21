import fs from 'fs'
import R from 'ramda'
import _ from 'lodash'
import shuffle from '../utils/shuffle'

const waveSampleCount = 2048
const tableWaveCount = 256
const speed = 3.0

const header = fs.readFileSync('./assets/header.wav')

export default () => {
  console.log('Building wavetable file')
  const table = _.times(tableWaveCount, w => {
    return _.times(waveSampleCount, x => {
      const pix = (2 * Math.PI * x) / waveSampleCount
      const amp = 1.0 + (speed * parseFloat(w)) / tableWaveCount
      const sin = Math.sin(pix) * amp
      const folded = 4 * (Math.abs(0.25 * sin + 0.25 - Math.round(0.25 * sin + 0.25)) - 0.25)
      return folded
    })
  })

  const outFileBufferArray = [Buffer.from(header)]

  table.map((w, v) => {
    const wbuf = Buffer.allocUnsafe(4 * waveSampleCount).fill(0)
    w.map((s, x) => wbuf.writeFloatLE(s, x * 4))
    outFileBufferArray.push(wbuf)
  })

  // calculate length.
  const length = outFileBufferArray.reduce((total, buf) => total + buf.length, 0)
  // theres two bits of metadata we need to write into the template file header
  // first, the file length (total). Note the - 8 (gotcha)
  // put it after the "RIFF" file id at the start of the file
  outFileBufferArray[0].writeInt32LE(length - 8, 4)
  // Then the length of the data chunk
  // this goes after the "data" chunk starting marker
  outFileBufferArray[0].writeInt32LE(length - outFileBufferArray[0].length, 132)
  // finally concat the buffers and write the file.
  !fs.existsSync(`./waves`) && fs.mkdirSync(`./waves`)
  fs.writeFile(`./waves/sine.wav`, Buffer.concat(outFileBufferArray), function(e) {})
}
