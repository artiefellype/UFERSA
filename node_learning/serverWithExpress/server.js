import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))

const db = []

app.post('/todos', async (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text
    }

    db.push(newTodo)
    res.json(newTodo)
})

app.get('/todo', (req, res) => {
    res.json(db)
})

app.get('/todo/:id', (req, res) => {
    const todo = db.find(t => {
        console.log(t)
        return t.id === +req.params.id
    })
    res.json({data: todo})
})

app.listen(8000, () => {
    console.log('server on localhost');
})