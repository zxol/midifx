import mw from 'midi-writer-js'
import R from 'ramda'
import _ from 'lodash'
import shuffle from '../utils/shuffle'

export default () => {
  console.log('Building midi file')
  var track = new mw.Track()
  track.setTimeSignature(4, 4)
  track.setTempo(128)
  const desyncSpeed = 0.4

  let kb = _.times(127).map(i => {
    return {
      width: 32,
      delta: ((i - 64.0) / 127.0) * 0.4,
      cursor: 0
    }
  })

  // kb = shuffle(kb)

  kb = kb.map((k, i) => {
    k.pitch = i
    return k
  })

  const offset = 64

  const note = (pitch, startTick, dur) =>
    track.addEvent(
      new mw.NoteEvent({
        pitch,
        startTick: parseInt(startTick),
        duration: 'T' + parseInt(dur)
      })
    )

  _.times(4).map(c => {
    kb.map(key => {
      note(key.pitch, offset + key.cursor, key.width)
      key.cursor += key.width * 4
    })
  })

  _.times(64).map(c => {
    kb.map(key => {
      note(key.pitch, offset + key.cursor, key.width)
      key.cursor += key.width * 4
      key.width += key.delta
      if (key.width < 1) key.width = 1
    })
  })

  var write = new mw.Writer(track)
  write.saveMIDI('out')
}
