import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import bodyParser from 'body-parser'
import cors from 'cors'

import dotenv from 'dotenv'
import roomRouter from './routes/roomRoutes'
dotenv.config()

const PORT = process.env.PORT || 2000

const app = express()

const corsOptions = {
    origin: 'http://localhost:8080'
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/room', roomRouter)

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
    const nickname = animals[Math.floor(Math.random() * animals.length)]
    mapping.set(socket.id, nickname)
    const joinMessage = {
        id: uuidv4(),
        type: 'join',
        socketId: socket.id,
        nickname
    }

    const roomId = socket.handshake.query['roomId'] as string

    socket.join(roomId)

    socket.to(roomId).emit('join', joinMessage)

    io.to(socket.id).emit('join', {...joinMessage, nickname: `You (${nickname})`})

    if(io.sockets.adapter.rooms.get(roomId) !== undefined) {
        const room = io.sockets.adapter.rooms.get(roomId) as Set<string>
        if(room.size == 3) {
            generatePassage()
                .then((passage: string[]) => {
                    io.emit('send_passage', passage)
                })
        }

    }

    socket.on('message', async (...args) => {
        const msg = args[0]
        const socketId = msg.socketId
        const roomId = socket.handshake.query['roomId'] as string
        const nickname = mapping.get(socketId)
        const content = msg.content
        const message = {
            id: uuidv4(),
            type: 'message',
            socketId,
            nickname,
            content
        }
        console.log(roomId)
        io.in(roomId).emit('message', message)
    })

    socket.on('complete', (...args) => {
        const socketId = args[0]
        const user = mapping.get(socketId)
        io.emit('message', `${user} finished!`)
    })

    socket.conn.on('close', (reason) => {
        const socketId = socket.id
        const nickname = mapping.get(socketId)
        const roomId = socket.handshake.query['roomId'] as string
        mapping.delete(socket.id)

        const message = {
            id: uuidv4(),
            type: 'leave',
            socketId,
            nickname,
        }
        io.in(roomId).emit('left', message)
    })

    
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})