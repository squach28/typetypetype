import express, { Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 2000

const app = express()
const server = http.createServer(app)

const mapping = {}

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8080'
    }
})

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'hello' })
})

io.on('connection', (socket) => {
    console.log(socket)
    socket.broadcast.emit('join', 'hello!')
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})