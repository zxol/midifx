import R from 'ramda'

const expoShaping = (slope, keyframes) => {
  const numFrames = keyframes.length
  return keyframes.map((frame, c) => {
    const wavePartialCount = frame.partials.length
    const ratio = (9 * c) / (numFrames - 1.0) + 0.5
    console.log('c ' + c + '  ratio: ' + ratio)
    frame.partials = frame.partials.map((a, i) => {
      if (i === 0) return a
      else return a / (i * (slope * ratio))
    })
    return frame
  })
}
export default R.curry(expoShaping)
