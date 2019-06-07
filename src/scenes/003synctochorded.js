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
  const desyncSpeed = 0.2
  const chordmap = [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0]

  let tracks = []
  shuffle(_.times(128)).map((i, index) => {
    if (chordmap[index % 12]) {
      const myTrack = newTrack({
        pitch: index,
        name: index,
        width: 32,
        delta: ((i - 64.0) / 127.0) * desyncSpeed,
        cursor: 0
      })
      // newCC(myTrack, 10, parseInt(i))
      _.times(32).map(i => {
        newNote(myTrack, myTrack.myData.pitch, offset + myTrack.myData.cursor, myTrack.myData.width)
        myTrack.myData.cursor += myTrack.myData.width * 4

      })
      _.times(256).map(i => {
        newNote(myTrack, myTrack.myData.pitch, offset + myTrack.myData.cursor, myTrack.myData.width)
        myTrack.myData.cursor += myTrack.myData.width * 4
        myTrack.myData.width += myTrack.myData.delta
        if (myTrack.myData.width < 1) myTrack.myData.width = 1
      })
      newNote(myTrack, 0, 128*4*200, 128)
      tracks.push(myTrack)
    }
  })

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

  var write = new mw.Writer(tracks)
  write.saveMIDI('out')
}
