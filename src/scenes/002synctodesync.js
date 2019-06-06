import mw from 'midi-writer-js'
import R from 'ramda'
import _ from 'lodash'

export default () => {
    console.log('Building midi file')
    var track = new mw.Track()
    track.setTimeSignature(4, 4)
    track.setTempo(128)
    // track.addEvent(new mw.ProgramChangeEvent({ instrument: 1 }))

    const kb = _.times(127).map(i => {
        return {
            width: 32,
            delta: ((i - 64.0) / 127.0) * 8.0,
            cursor: 0,
            pitch: i
        }
    })

    const note = (pitch, startTick, dur) =>
        track.addEvent(new mw.NoteEvent({ pitch, startTick, duration: 'T' + dur }))

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
            key.width += delta
            key.width < 1 && key.width = 1
        })
    })

    var write = new mw.Writer(track)
    write.saveMIDI('out')
}
