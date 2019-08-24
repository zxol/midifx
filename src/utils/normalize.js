import R from 'ramda'
import _ from 'lodash'

export default function(wave) {
  const max = R.reduce(R.max, 0, wave)
  const min = -R.reduce(R.min, 0, wave)
  const co = min > max ? 1 / min : 1 / max
  return R.map(R.multiply(co), wave)
}
