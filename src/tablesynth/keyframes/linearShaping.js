import R from 'ramda'

const linearShaping = (slope, keyframes) => {
  return keyframes.map(frame => {
    const wavePartialCount = frame.partials.length
    frame.partials = frame.partials.map((a, i) => {
      const fractionalIndex = i / wavePartialCount
      const mod = 1 + fractionalIndex * (-1 * slope)
      if (mod < 0) return 0
      else return (1 + fractionalIndex * (-1 * slope)) * a
    })
    return frame
  })
}
export default R.curry(linearShaping)
