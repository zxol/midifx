import mw from 'midi-writer-js'
import shuffle from '../utils/shuffle'
import random from '../utils/random'
import { addNote, newTrack, writeFile } from '../utils/midi'
import { times, flatten, pipe, filter, add, concat, map } from 'ramda'

export default () => {
  console.log('Building midi file')
  let tracks = []
  let mytrack = newTrack(null, 4, 4, 130)
  // addNote(mytrack, 0, 128 * 4 * 200, 128)

  // console.log(createGoldenSequence(10, 100, 10))

  const seq = createGoldenSequence(0, 16 * 4 * 128, 100, 0.1).map(Math.round)
  console.log(seq)
  map(i => addNote(mytrack, 0, i, 1), seq)
  writeFile(mytrack, 'test')
}

const PhiI = 0.61803398875

const createGoldenSequence = (min, max, count, accel = 1) => {
  const len = max - min
  return times(i => {
    if (i == 0) return min
    return (1 - Math.pow(PhiI, i * accel)) * len + min
  }, count)
}
