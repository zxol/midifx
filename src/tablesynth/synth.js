import writeSerumWavetableFile from './writewavfile'
// import generateTable from './table'
// import generateKeyframes from './keyframes/random'
// import linearShaping from './keyframes/linearShaping'
// import expoShaping from './keyframes/expoShaping'

import muteRandom from './keyframes/muteRandom'
import generateLinearMap from './map'
import R from 'ramda'

import { job, start, stop } from 'microjob'

export default async () => {
  const numberOfFiles = 40
  try {
    // start the worker pool
    await start({ maxWorkers: 10 })

    const data = await Promise.all(
      R.times(
        async i =>
          job(async () => {
            const synthesizeWaveTable = function({
              numKeyFrames = 16,
              tableWaveCount = 256,
              waveSampleCount = 2048,
              partialCount = 0,
              fileName = 'wave'
            }) {
              const generateTable = require('../../../build/tablesynth/table').default
              const generateKeyframes = require('../../../build/tablesynth/keyframes/random')
                .default
              const linearShaping = require('../../../build/tablesynth/keyframes/linearShaping')
                .default
              const expoShaping = require('../../../build/tablesynth/keyframes/expoShaping').default
              const muteRandom = require('../../../build/tablesynth/keyframes/muteRandom').default
              const removeFundamental = require('../../../build/tablesynth/keyframes/removeFundamental')
                .default
              const generateLinearMap = require('../../../build/tablesynth/map').default

              partialCount = partialCount === 0 ? parseInt(waveSampleCount / 1) : partialCount
              console.log('Building wavetable file ' + fileName)

              const ampKeyFrames = removeFundamental(
                muteRandom(
                  expoShaping(generateKeyframes(numKeyFrames, tableWaveCount, partialCount), 2),
                  0.7
                )
              )
              const ampMap = generateLinearMap(tableWaveCount, partialCount, ampKeyFrames)

              const phaseKeyFrames = generateKeyframes(numKeyFrames, tableWaveCount, partialCount)
              const phaseMap = generateLinearMap(tableWaveCount, partialCount, phaseKeyFrames)

              const tableData = generateTable({ ampMap, phaseMap, tableWaveCount, waveSampleCount })
              return tableData
            }
            return synthesizeWaveTable({})
          }),

        numberOfFiles
      )
    )

    data.map((tableData, index) =>
      writeSerumWavetableFile({ tableData, fileName: 'big-booty' + index })
    )

    // console.log(data) // 1000000
  } catch (err) {
    console.error(err)
  } finally {
    // shutdown worker pool
    await stop()
  }
  // })()
}
