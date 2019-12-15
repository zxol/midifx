import { zeroArray, mapSkip } from '../../utils/array'
import { times, flip, divide, pipe } from 'ramda'
import rand from '../../utils/random'
export const sine = partialCount => {
  const partials = zeroArray(partialCount)
  partials[0] = 1
  return partials
}

export const sawtooth = partialCount => {
  return times(i => 1 / (i + 1), partialCount)
}

export const triangle = partialCount => {
  return mapSkip((x, i, c) => 1.0 / ((c + 1) * (c + 1)), 2, zeroArray(partialCount))
}

export const square = partialCount => {
  const square = x => x * x
  return mapSkip((x, i, c) => 1.0 / (c + 1), 2, zeroArray(partialCount))
}

export const randomFlat = partialCount => {
  times(x => rand(), partialCount)
}

export const zeros = zeroArray

export default {
  sine,
  sawtooth,
  triangle,
  square,
  randomFlat,
  zeros
}
