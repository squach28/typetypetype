import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import axios from 'axios'

const PORT = process.env.PORT || 2000

const app = express()
const server = http.createServer(app)

const mapping = new Map<string, string>()

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080'
    }
})

const animals = ['hippo', 'dog', 'cat', 'rabbit']

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'hello' })
})

const generatePassage = async () => {
    const res = await axios.get('https://monkeytype.com/languages/english.json')
    const passage = []
    const words = res.data.words
    const NUM_OF_WORDS = 10
    for(let i = 0; i < NUM_OF_WORDS; i++) {
        const word = words[Math.floor(Math.random() * words.length)]
        passage.push(`${word} `)
    }

    return passage
}

io.on('connection', (socket) => {
    const animal = animals[Math.floor(Math.random() * animals.length)]
    mapping.set(socket.id, animal)
    socket.broadcast.emit('join', animal)

    console.log(io.engine.clientsCount)

    if(io.engine.clientsCount === 3) {
        generatePassage()
            .then((passage: string[]) => {
                io.emit('send_passage', passage)
            })
    }

    socket.on('message', async (...args) => {
        const msg = args[0]
        console.log(msg)
        const user = mapping.get(msg.userId)
        const content = msg.content
        io.emit('message', `${user}: ${content}`)
    })

    socket.on('complete', (...args) => {
        const socketId = args[0]
        const user = mapping.get(socketId)
        io.emit('message', `${user} finished!`)
    })

    socket.conn.on('close', (reason) => {
        mapping.delete(socket.id)
        socket.broadcast.emit('left', animal)
    })

    
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})