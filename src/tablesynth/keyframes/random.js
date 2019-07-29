import R from 'ramda'
import rand from '../../utils/random'

const generateKeyframes = (number, wCount, pCount) => {
  const randomPartialAmps = pCount => R.times(i => rand(1.0), pCount)
  return R.times(
    n => ({
      pos: parseInt((wCount / number) * n),
      partials: randomPartialAmps(pCount)
    }),
    number + 1
  )
}
