import { ifft } from 'fft-js'
import { times, pipe, head, map, multiply, negate, pair, nthArg, zip, last } from 'ramda'
import { zeroArray, filterI } from '../../utils/array'
import { isEven } from 'ramda-adjunct'

const preparePhasor = (amps, phases, numSamples) => [
  [0, ...amps.map(multiply(-2 * numSamples)), ...zeroArray(2 * numSamples - amps.length - 1)],
  [0, ...phases.map(multiply(-2 * numSamples)), ...zeroArray(2 * numSamples - phases.length - 1)]
]

const formatForIfft = x => zip(head(x), last(x))

const isEvenIndex = pipe(
  nthArg(1),
  isEven
)
const formatForWave = pipe(
  filterI(isEvenIndex),
  map(head)
)

export default pipe(
  preparePhasor,
  formatForIfft,
  ifft,
  formatForWave
)
