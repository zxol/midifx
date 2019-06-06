import mw from 'midi-writer-js'
import R from 'ramda'
import _ from 'lodash'
var track = new mw.Track()
track.setTimeSignature(4,4)
track.setTempo(128)
// track.addEvent(new mw.ProgramChangeEvent({ instrument: 1 }))
let delta = 32
const offset = 64
let cursor = 0
const pitch = 'c4'

const note = (startTick, dur) =>
    track.addEvent(new mw.NoteEvent({ pitch, startTick, duration: 'T' + dur }))

_.times(4).map(c => {
    note(offset + cursor, delta)
    cursor += delta * 4
})
_.times(64).map(c => {
    note(offset + cursor, delta)
    cursor += delta * 4
    delta += 8
})
var write = new mw.Writer(track)
write.saveMIDI('out')
