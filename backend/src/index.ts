import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'

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

io.on('connection', (socket) => {
    const animal = animals[Math.floor(Math.random() * animals.length)]
    mapping.set(socket.id, animal)
    socket.broadcast.emit('join', animal)

    socket.on('message', (...args) => {
        const msg = args[0]
        console.log(msg)
        const user = mapping.get(msg.userId)
        const content = msg.content
        io.emit('message', `${user}: ${content}`)
    })

    socket.conn.on('close', (reason) => {
        mapping.delete(socket.id)
        socket.broadcast.emit('left', animal)
    })
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})