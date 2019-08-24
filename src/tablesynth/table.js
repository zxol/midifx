import R from 'ramda'
import * as RA from 'ramda-adjunct'

import normalize from '../utils/normalize'
import fsin from '../utils/fastsine'

import fft from './fft/fft'

const generateTable2 = ({ ampMap, phaseMap, tableWaveCount, waveSampleCount }) => {
  console.log({ tableWaveCount, waveSampleCount })
  return R.times(w => {
    console.log('Wave ' + w + ' started.')
    return normalize(
      R.times(sample => {
        // console.log(sample)
        const f = 1.0 / waveSampleCount
        return R.sum(
          RA.mapIndexed((amp, index) => {
            // console.log(amp, phaseMap[w])
            const phase = phaseMap[w][index]
            return amp * fsin(phase + 1.0 * sample * f * (index + 1))
          }, ampMap[w])
        )
      }, waveSampleCount)
    )
  }, tableWaveCount)
}

const generateTable = ({ ampMap, phaseMap, tableWaveCount, waveSampleCount }) => {
  console.log({ tableWaveCount, waveSampleCount })
  return R.times(w => {
    console.log('Wave ' + w + ' started.')
    return normalize(fft(ampMap[w], waveSampleCount))
  }, tableWaveCount)
}

export default generateTable
