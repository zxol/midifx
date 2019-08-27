import { times } from 'ramda'
import rand from '../../utils/random'

const generateKeyframes = (number, wCount, pCount) => {
  const randomPartialAmps = pCount => times(i => rand(1.0), pCount)
  return times(
    n => ({
      pos: parseInt((wCount / number) * n),
      partials: randomPartialAmps(pCount)
    }),
    number + 1
  )
}

export default generateKeyframes
