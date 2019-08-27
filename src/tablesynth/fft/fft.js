import { ifft } from 'fft-js'
import { times, pipe, head, map, multiply, negate, pair, nthArg } from 'ramda'
import { zeroArray, filterI } from '../../utils/array'
import { isEven } from 'ramda-adjunct'

const preparePhasor = (partials, numSamples) => [
  0,
  ...partials.map(multiply(-2 * numSamples)),
  ...zeroArray(2 * numSamples - partials.length - 1)
]

const formatForIfft = map(pair(0))

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
