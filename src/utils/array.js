import { times, always, addIndex, filter, map } from 'ramda'

export const zeroArray = times(always(0))
export const filterI = addIndex(filter)
export const mapI = addIndex(map)
export const mapSkip = (f, skip, arr) =>
  mapI((x, i, a) => (i % skip === 0 ? f(x, i / skip, i, a) : x), arr)

export default zeroArray
