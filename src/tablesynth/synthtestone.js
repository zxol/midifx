import writeSerumWavetableFile from './writewavfile'
// import generateTable from './table'
// import generateKeyframes from './keyframes/random'
// import linearShaping from './keyframes/linearShaping'
// import expoShaping from './keyframes/expoShaping'
import synthesizeWaveTable from './synth2'

import muteRandom from './keyframes/muteRandom'
import generateLinearMap from './map'
import { times } from 'ramda'

import { job, start, stop } from 'microjob'

export default async () => {
  // const synthesizeWaveTable = require('../../../build/tablesynth/synth2').default
  writeSerumWavetableFile({ tableData: synthesizeWaveTable({}), fileName: 'tester' })
  // const numberOfFiles = 1
  // try {
  //   // start the worker pool
  //   await start({ maxWorkers: 10 })
  //
  //   const data = await Promise.all(
  //     times(
  //       async i =>
  //         job(async () => {
  //           const synthesizeWaveTable = require('../../../build/tablesynth/synth2').default
  //           return synthesizeWaveTable({})
  //         }),
  //       numberOfFiles
  //     )
  //   )
  //
  //   data.map((tableData, index) =>
  //     writeSerumWavetableFile({
  //       tableData,
  //       fileName: 'spins-partials-' + index.toString().padStart(3, '0')
  //     })
  //   )
  //
  //   // console.log(data) // 1000000
  // } catch (err) {
  //   console.error(err)
  // } finally {
  //   // shutdown worker pool
  //   await stop()
  // }
  // // })()
}
