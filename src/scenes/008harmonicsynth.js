import fs from 'fs'
import R from 'ramda'
import _ from 'lodash'
import shuffle from '../utils/shuffle'
import fsin from '../utils/fastsine'
import rand from '../utils/random'
import normalize from '../utils/normalize'

const generateKeyframes = (number, wCount, pCount) => {
  const randomPartialAmpsSaw = pCount => R.times(i => rand(1.0 / (i + 1)), pCount)
  const randomPartialAmps = pCount => R.times(i => rand(1.0), pCount)
  return R.times(
    n => ({
      pos: parseInt((wCount / number) * n),
      partials: randomPartialAmps(pCount)
    }),
    number + 1
  )
}

const generateLinearPartialAmpMap = (keyframes, wCount, pCount) => {
  return R.times(w => {
    const lps = R.last(R.filter(f => f.pos <= w, keyframes))
    const rps = R.head(R.filter(f => f.pos >= w, keyframes))
    const sLen = rps.pos - lps.pos
    const pos = (1 + (1.0 * w - lps.pos)) / (sLen + 1)
    return R.times(pIndex => {
      const la = lps.partials[pIndex]
      const ra = rps.partials[pIndex]
      return la + (ra - la) * pos
    }, pCount)
  }, wCount)
}

const generateTable = (ampMap, wCount, wsCount) => {
  return _.times(wCount, w => {
    console.log('Wave ' + w + ' started.')
    return normalize(
      _.times(wsCount, sample => {
        return _.sum(
          _.map(ampMap[w], (amp, index) => {
            return amp * fsin(((1.0 * sample) / wsCount) * (index + 1))
          })
        )
      })
    )
  })
}

const writeSerumWavetableFile = function(tableData, fileName = 'test', header, wsCount) {
  const outFileBufferArray = [Buffer.from(header)]
  tableData.map((w, v) => {
    const wbuf = Buffer.allocUnsafe(4 * wsCount).fill(0)
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
  fs.writeFile(`./waves/${fileName}.wav`, Buffer.concat(outFileBufferArray), function(e) {
    e && console.error(e)
  })
}

const synthesizeWaveTable = function(
  numKeyFrames,
  tableWaveCount,
  partialCount,
  waveSampleCount,
  fileName,
  header
) {
  console.log('Building wavetable file ' + fileName)
  console.time()
  const keyFrames = generateKeyframes(numKeyFrames, tableWaveCount, partialCount)
  const linAmpMap = generateLinearPartialAmpMap(keyFrames, tableWaveCount, partialCount)
  const table = generateTable(linAmpMap, tableWaveCount, waveSampleCount)
  //console.log(table)
  writeSerumWavetableFile(table, fileName, header, waveSampleCount)
  console.timeLog()
}

export default function() {
  const waveSampleCount = 2048
  const tableWaveCount = 256
  const partialCount = waveSampleCount / 4
  const header = fs.readFileSync('./assets/header.wav')
  R.times(
<<<<<<< HEAD
    i =>
      synthesizeWaveTable(
        3,
        tableWaveCount,
        partialCount,
        waveSampleCount,
        'random-spectral-3-' + i,
        header
      ),
=======
    i => synthesizeWaveTable(4, tableWaveCount, partialCount, waveSampleCount, 'cool' + i, header),
>>>>>>> origin
    40
  )
  //synthesizeWaveTable(4, tableWaveCount, partialCount, waveSampleCount, 'cool', header)
}
