import { ifft } from 'fft-js'
import R from 'ramda'

const preparePhasor = (partials, numSamples) => {
  const numPartials = partials.length
  return R.times(i => {
    if (i === 0) return [0, 0]
    if (i <= numPartials) {
      return [0, partials[i - 1] * numSamples * -2]
    }
    // const start = numSamples * 2 - numPartials - 1
    // if (i > start) {
    //   return [0, partials[numPartials - (i - start)] * numSamples * 1]
    // }
    return [0, 0]
  }, numSamples * 2)
}

const getSig = arr => arr.filter((v, i) => i % 2 === 0).map(v => v[0])

// const myPhasor = preparePhasor([1, 1], 16)
// console.log(myPhasor)
// // console.log()
// console.log(ifft(myPhasor))
// console.log(getSig(ifft(myPhasor)))
//
export default function(partials, sampleCount) {
  return getSig(ifft(preparePhasor(partials, sampleCount)))
}
