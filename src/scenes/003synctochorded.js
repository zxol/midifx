import mw from 'midi-writer-js'
import R from 'ramda'
import _ from 'lodash'
import shuffle from '../utils/shuffle'

export default () => {
    console.log('Building midi file')
    const newTrack = myData => {
        const track = new mw.Track()
        track.setTimeSignature(4, 4)
        track.setTempo(128)
        track.setTrackName(myData.name)
        track.myData = myData
        return track
    }

    const chordmap = [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0]

    let tracks = []
    _.times(128).map(i => {
        if (chordmap[i % 12]) {
            tracks.add(newTrack({ pitch: i, name: i }))
        }
    })

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
