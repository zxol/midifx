import mw from 'midi-writer-js'

console.log('hi')

var track = new mw.Track()

// Define an instrument (optional):
track.addEvent(new mw.ProgramChangeEvent({ instrument: 1 }))

// Add some notes:
var note = new mw.NoteEvent({ pitch: ['C4', 'D4', 'E4'], duration: '4' })
track.addEvent(note)

// Generate a data URI
var write = new mw.Writer(track)
write.saveMIDI('out')
