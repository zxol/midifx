// import first from './scenes/001firstexperiment'
// import second from './scenes/002synctodesync'
// import third from './scenes/003synctochorded'
// import forth from './scenes/004chordedSingle'
// import fifth from './scenes/005makeWavefolding'
// import sixth from './scenes/006makeharmonics'
// import seventh from './scenes/007additivefun'
// import eighth from './scenes/008harmonicsynth'
// eighth()
//seventh()
// sixth()
// fifth()
// forth()
// third()
// second()
// first()

import synth from './tablesynth/synth'

synth()
// import fsin from './utils/fastsine'
// import R from 'ramda'
// var fft = require('fft-js').fft,
//   signal = R.times(i => fsin(i / 1024.0) + fsin((3 * i) / 1024.0), 1024)
//
// var phasors = fft(signal)
//
// // console.log(phasors)
// console.log(R.head(phasors), R.last(phasors))
//
// phasors.map((x, i) => {
//   // console.log(Math.round(x[0]))
//   if (Math.round(x[0] + x[1]) !== 0) {
//     console.log(`${i} : ${x}`)
//   }
// })
//
// var ifft = require('fft-js').ifft
// // var phasors2 = R.times(() => [0, 0], 128)
// // phasors2[1] = [0, -64]
// // phasors2[63] = [0, 64]
// // var signal2 = ifft(phasors2)
//
// const preparePhasor = (partials, numSamples) => {
//   const numPartials = partials.length
//   return R.times(i => {
//     if (i === 0) return [0, 0]
//     if (i <= numPartials) {
//       return [0, partials[i - 1] * numSamples * -2]
//     }
//     // const start = numSamples * 2 - numPartials - 1
//     // if (i > start) {
//     //   return [0, partials[numPartials - (i - start)] * numSamples * 1]
//     // }
//     return [0, 0]
//   }, numSamples * 2)
// }
//
// const getSig = arr => arr.filter((v, i) => i % 2 === 0).map(v => v[0])
//
// const myPhasor = preparePhasor([1, 1], 16)
// console.log(myPhasor)
// // console.log()
// console.log(ifft(myPhasor))
// console.log(getSig(ifft(myPhasor)))
