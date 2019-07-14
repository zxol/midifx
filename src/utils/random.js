import MersenneTwister from 'mersenne-twister'
const generator = new MersenneTwister()

export default function(max = 1.0) {
  return generator.random() * max
}
