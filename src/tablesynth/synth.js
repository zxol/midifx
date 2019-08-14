import writeSerumWavetableFile from './writewavfile'
import generateTable from './table'
import generateKeyframes from './keyframes/random'
import generateLinearMap from './map'
import R from 'ramda'

const synthesizeWaveTable = function({
  numKeyFrames = 10,
  tableWaveCount = 256,
  waveSampleCount = 2048,
  partialCount = 0,
  fileName = 'wave'
}) {
  partialCount = partialCount === 0 ? parseInt(waveSampleCount / 4) : partialCount
  console.log('Building wavetable file ' + fileName)
  console.time()

  const ampKeyFrames = generateKeyframes(numKeyFrames, tableWaveCount, partialCount)
  const ampMap = generateLinearMap(tableWaveCount, partialCount, ampKeyFrames)

  const phaseKeyFrames = generateKeyframes(numKeyFrames, tableWaveCount, partialCount)
  const phaseMap = generateLinearMap(tableWaveCount, partialCount, phaseKeyFrames)

  const tableData = generateTable({ ampMap, phaseMap, tableWaveCount, waveSampleCount })
  // console.log(tableData)
  writeSerumWavetableFile({ tableData, fileName })
  console.timeLog()
}

export default function() {
  const waveSampleCount = 2048
  const tableWaveCount = 256
  const partialCount = waveSampleCount / 4
  R.times(i => synthesizeWaveTable({ fileName: 'random-spectral-6-' + i }), 40)
}
