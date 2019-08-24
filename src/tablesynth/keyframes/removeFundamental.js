import R from 'ramda'
import rand from '../../utils/random'
const removeFundamental = keyframes => {
  return keyframes.map(frame => {
    frame.partials[0] = 0
    return frame
  })
}
export default removeFundamental
