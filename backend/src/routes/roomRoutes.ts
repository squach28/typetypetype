import { createRoom, getRoom } from "../controllers/roomController"

const express = require('express')

const roomRouter = express.Router()

roomRouter.post('/', createRoom)
roomRouter.get('/:id', getRoom)


export default roomRouter