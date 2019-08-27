import { zeroArray } from '../../utils/array'
import { times, flip, divide } from 'ramda'
export default function(partialCount) {
  return times(flip(divide)(1), partialCount)
}
