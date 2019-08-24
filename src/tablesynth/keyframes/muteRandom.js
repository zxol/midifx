import R from 'ramda'
import rand from '../../utils/random'
const muteRandom = (keyframes, amount) => {
  return keyframes.map(frame => {
    frame.partials = frame.partials.map(a => (rand() < amount ? 0 : a))
    return frame
  })
}
export default muteRandom
