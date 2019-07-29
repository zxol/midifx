import writeSerumWavetableFile from './writeWaveFile'

const synthesizeWaveTable = function({
  numKeyFrames = 3,
  tableWaveCount = 256,
  waveSampleCount = 2048,
  partialCount = 0,
  fileName = 'wave'
}) {
  partialCount = partialCount === 0 ? waveSampleCount / 4 : partialCount

  console.log('Building wavetable file ' + fileName)
  console.time()
  const keyFrames = generateKeyframes(numKeyFrames, tableWaveCount, partialCount)
  const linAmpMap = generateLinearPartialAmpMap(keyFrames, tableWaveCount, partialCount)
  const table = generateTable(linAmpMap, tableWaveCount, waveSampleCount)
  //console.log(table)
  writeSerumWavetableFile(table, fileName, waveSampleCount)
  console.timeLog()
}

export default function() {
  const waveSampleCount = 2048
  const tableWaveCount = 256
  const partialCount = waveSampleCount / 4
  R.times(i => synthesizeWaveTable({ fileName: 'random-spectral-3-' + i }), 40)
}
