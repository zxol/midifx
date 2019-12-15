import mw from 'midi-writer-js'

import { curry, flatten } from 'ramda'

export const newTrack = (myData, denominator, numerator, tempo) => {
  const track = new mw.Track()
  track.setTimeSignature(denominator, numerator)
  track.setTempo(tempo)
  // track.addTrackName(myData.name)
  track.myData = myData
  return track
}

export const addNote = curry((track, pitch, startTick, dur) =>
  track.addEvent(
    new mw.NoteEvent({
      pitch,
      startTick: parseInt(startTick),
      duration: 't' + parseInt(dur)
    })
  )
)

export const writeFile = (track, filename) => {
  var write = new mw.Writer(flatten([track]))
  write.saveMIDI(filename)
}

export default {
  addNote,
  newTrack,
  writeFile
}
