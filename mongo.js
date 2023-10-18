const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  'mongodb+srv://mohaak:' + password + '@cluster0.juukqdd.mongodb.net/noteApp?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const noteList = [
  {
    content: "React ia a frontend framework",
    important: true
  },
  {
    content: "Express ia a backendend framework",
    important: false
  }
]

const notes = noteList.map(note => {
  const dbNote = new Note(note)
  dbNote.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
  })

})
