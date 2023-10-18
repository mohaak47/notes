const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


const noteList = [
  {
    content: "HTML is easy",
    important: true
  },
  {
    content: "Browser can execute only JavaScript",
    important: false
  }
]

const notes = noteList.map(note => {
  const dbNote = new Note(note)
  dbNote.save().then(result => {
  console.log('note saved!')
  })
})



  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
  })
})


  app.post('/api/notes', (request,response) => {
    const body = request.body
    if (body.content === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
    const note = new Note({
      content: body.content,
      important: body.important || false,
    })
    console.log(content)
    console.log(important)
    note.save().then(savedNote => {
      response.json(savedNote)
    })
  } )
  app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
      response.json(note)
    })
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
  })

  app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT,() => {
console.log(`Server running on port ${PORT}`)
})
