const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

app.use(cors())

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.set('strictQuery', false)
mongoose.connect(url)
        .then(result => {
          console.log('connected to MongoDB')
        })
        .catch((error) => {
          console.log('error connecting to MongoDB', error.message)
        })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON',{
  transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
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

  app.use(express.static('dist'))

const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
console.log(`Server running on port ${PORT}`)
})
