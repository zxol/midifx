import writeSerumWavetableFile from './writewavfile'
import generateTable from './table'
// import generateKeyframes from './keyframes/random'
// import linearShaping from './keyframes/linearShaping'
// import expoShaping from './keyframes/expoShaping'

import muteRandom from './keyframes/muteRandom'
import { generateLinearMap, generateZeroMap } from './map'
import { times } from 'ramda'
import basic from './waves/basic'

export default async () => {
  const wave = basic.sawtooth(1024)
  const filterDown = times(i => {}, 255)
  const tableData = generateTable({
    ampMap: generateLinearMap(256, 1024, [
      { pos: 0, partials: basic.sawtooth(1024) },
      { pos: 255, partials: basic.square(1024) }
    ]),
    phaseMap: generateZeroMap(256, 1024)
  })
  writeSerumWavetableFile({ tableData, fileName: 'simple' })
}
