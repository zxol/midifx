import { zeroArray } from '../../utils/array'
import { times, flip, divide } from 'ramda'

export const sine = partialCount => {
  const partials = zeroArray(partialCount)
  partials[0] = 1
  return partials
}

export const sawtooth = partialCount => {
  return times(flip(divide)(1), partialCount)
}

export const triangle = partialCount => {}

export default {
  sine,
  sawtooth
}
