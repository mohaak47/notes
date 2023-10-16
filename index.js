const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(cors())
app.use(express.static('dist'))


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
    content: "HTML is easy",
    important: true
  },
  {
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  },
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
  })
})


 app.get('/', (request, response) => {
  response.send('<h1> Hello,World of Web Programming </h1>')
})
  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
    response.json(notes)
  })
})

  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find( note => note.id === id)
    if (note) {
        response.json(note)
    }
    else {
      response.status(404).end()
    }
  })

const PORT = process.env.port || 3001
app.listen(PORT,() => {
console.log(`Server running on port ${PORT}`)
})
