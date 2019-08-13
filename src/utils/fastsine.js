import R from 'ramda'
import _ from 'lodash'

const length = 2048
const lookup = _.times(length, i => Math.sin((2 * Math.PI * i) / length))

export default function(x) {
  const xm = parseInt(x * length)
  if (x >= 0) return lookup[xm % length]
  else return lookup[length + (xm % length)]
}
