import R from 'ramda'

const expoShaping = (slope, keyframes) => {
  return keyframes.map(frame => {
    const wavePartialCount = frame.partials.length
    frame.partials = frame.partials.map((a, i) => {
      if (i === 0) return a
      else return a / (i * slope)
    })
    return frame
  })
}
export default R.curry(expoShaping)
