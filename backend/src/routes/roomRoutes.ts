import { createRoom } from "../controllers/roomController"

const express = require('express')

const roomRouter = express.Router()

roomRouter.post('/', createRoom)


export default roomRouter