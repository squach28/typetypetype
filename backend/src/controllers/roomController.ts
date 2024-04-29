import { Request, Response } from "express";
import { db } from "../utils/db";
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'


const COLLECTION_NAME = 'rooms'
const SALT_ROUNDS = 10
const roomsRef = db.ref(COLLECTION_NAME)

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body
        const ref = roomsRef.child(uuidv4())
        const savedRef = ref.set({
            active: false
        })
        

        res.status(201).json({
            status: true
        })
    } catch(e) {
        res.status(500).json({ message: 'Something went wrong, please try again.'})
    }
}

export const getRoom = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        if(id === undefined || id === '') {
            res.status(404).json({ message: 'id is missing in parameter'})
            return
        }
        const roomRef = roomsRef.child(id as string)
        const data = await roomRef.get()
        res.status(200).json({ id, data })
    } catch(e) {
        res.status(500).json({ message: 'Something went wrong, please try again.'})
    }
}

