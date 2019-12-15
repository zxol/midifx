import generateTable from './table'
import generateKeyframes from './keyframes/random'
import linearShaping from './keyframes/linearShaping'
import expoShaping from './keyframes/expoShaping'

import muteRandom from './keyframes/muteRandom'
import { generateLinearMap, generateZeroMap } from './map'
import removeFundamental from '../tablesynth/keyframes/removeFundamental'

import { times, pipe } from 'ramda'
const synthesizeWaveTable = ({
  numKeyFrames = 10,
  tableWaveCount = 256,
  waveSampleCount = 2048,
  partialCount = 0,
  fileName = 'wave'
} = {}) => {
  partialCount = partialCount === 0 ? parseInt(waveSampleCount / 1) : partialCount
  const ampKeyFrames = pipe(
    generateKeyframes,
    expoShaping(1),
    muteRandom(0.6),
    removeFundamental
  )(numKeyFrames, tableWaveCount, partialCount)

  const ampMap = generateLinearMap(tableWaveCount, partialCount, ampKeyFrames)

  const phaseKeyFrames = generateKeyframes(numKeyFrames, tableWaveCount, partialCount)
  const phaseMap = generateZeroMap(256, 1024) //generateLinearMap(tableWaveCount, partialCount, phaseKeyFrames)

  const tableData = generateTable({ ampMap, phaseMap, tableWaveCount, waveSampleCount })
  return tableData
}
export default synthesizeWaveTable
