import mw from 'midi-writer-js'
import _ from 'lodash'
import shuffle from '../utils/shuffle'
import random from '../utils/random'

import { times, flatten, pipe, filter, add, concat, map } from 'ramda'

export default () => {
  console.log('Building midi file')

  const newTrack = myData => {
    const track = new mw.Track()
    track.setTimeSignature(4, 4)
    track.setTempo(128)
    // track.addTrackName(myData.name)
    track.myData = myData
    return track
  }
  const newNote = (trak, pitch, startTick, dur) =>
    trak.addEvent(
      new mw.NoteEvent({
        pitch,
        startTick: parseInt(startTick),
        duration: 'T' + parseInt(dur)
      })
    )
  // const newCC = (trak, channel, value) => {
  //   trak.addEvent(
  //     new mw.ControllerChangeEvent({ controllerNumber: channel, controllerValue: value })
  //   )
  // }

  const offset = 64
  const desyncSpeed = 0.05
  const chordmap = [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0]

  let tracks = []
  let myTrack = newTrack()

  newNote(myTrack, 0, 128 * 4 * 200, 128)

  const makeChordMap = function(chordShape, pitch, minPitch, maxPitch) {
    const extend = pipe(
      a => concat(a, times(i => a.map(add((i + 1) * 12)), 11)),
      flatten,
      map(add(pitch)),
      filter(a => a > minPitch && a < maxPitch)
    )
    return {
      pitches: extend(chordShape)
    }
  }

  console.log(makeChordMap([0, 4, 7], 1, 0, 127))

  const triad = {
    maj: [0, 4, 7],
    min: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7]
  }

  const sev = (type, triad) => triad.add({ min: 10, maj: 11 }[type])

  const sc = {
    maj: [sc('maj'), sc('min'), sc('min'), sc('maj'), sc('maj'), sc('min'), sc('dim')],
    min: [sc('min'), sc('dim'), sc('maj'), sc('min'), sc('min'), sc('maj'), sc('maj')]
  }

  const testProgression = [1, 4, 6, 5]

  const thinTest = function(map, amount) {
    return filter(_ => random() < amount, map)
  }

  const myMap = makeChordMap(sc('maj'))

  // const myOrder = new UInt8Array(32)
  // let recursiveSpaceFill = (arr, count) => {
  //   const len = arr.length
  //   if (len === 1) {
  //     arr[0] = count
  //     return true
  //   }
  //   const midpoint = Math.floor(len / 2)
  //   if (!arr[midpoint]) {
  //     arr[midpoint] = count++
  //     recursiveSpaceFill(arr.subarrray(0, midpoint), count) // doesnt work as wanted.  will fill
  //     recursiveSpaceFill(arr.subarrray(midpoint, len), count)
  //   }
  // }
  //
  // _.times(128)
  //   .reverse()
  //   .map((i, index) => {
  //     if (chordmap[index % 12]) {
  //       const myData = {
  //         pitch: index,
  //         name: index,
  //         width: 32,
  //         delta: ((i - 64.0) / 127.0) * desyncSpeed,
  //         cursor: 0
  //       }
  //       // newCC(myTrack, 10, parseInt(i))
  //       _.times(32).map(i => {
  //         newNote(myTrack, myData.pitch, offset + myData.cursor, myData.width)
  //         myData.cursor += myData.width * 4
  //       })
  //       _.times(512).map(i => {
  //         newNote(myTrack, myData.pitch, offset + myData.cursor, myData.width)
  //         myData.cursor += myData.width * 4
  //         myData.width += myData.delta
  //         if (myData.width < 1) myData.width = 1
  //       })
  //       // tracks.push(myTrack)
  //     }
  //   })
  // let kb = _.times(127).map(i => {
  //   return {
  //     width: 32,
  //     delta: ((i - 64.0) / 127.0) * 0.4,
  //     cursor: 0
  //   }
  // })

  // kb = shuffle(kb)

  // kb = kb.map((k, i) => {
  //   k.pitch = i
  //   return k
  // })

  // const note = (pitch, startTick, dur) =>
  //   track.addEvent(
  //     new mw.NoteEvent({
  //       pitch,
  //       startTick: parseInt(startTick),
  //       duration: 'T' + parseInt(dur)
  //     })
  //   )
  //
  // _.times(4).map(c => {
  //   kb.map(key => {
  //     note(key.pitch, offset + key.cursor, key.width)
  //     key.cursor += key.width * 4
  //   })
  // })
  //
  // _.times(64).map(c => {
  //   kb.map(key => {
  //     note(key.pitch, offset + key.cursor, key.width)
  //     key.cursor += key.width * 4
  //     key.width += key.delta
  //     if (key.width < 1) key.width = 1
  //   })
  // })

  var write = new mw.Writer([myTrack])
  write.saveMIDI('out')
}
