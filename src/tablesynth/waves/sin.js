import { zeroArray } from '../../utils/array'
export default function(partialCount) {
  const partials = zeroArray(partialCount)
  partials[0] = 1
  return partials
}
