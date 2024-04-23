import { Request, Response } from "express";
import { adminFirestore } from "../utils/db";
import bcrypt from 'bcrypt'

const COLLECTION_NAME = 'rooms'
const SALT_ROUNDS = 10

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body
        const doc = adminFirestore.collection(COLLECTION_NAME).doc()
        const hash = await bcrypt
            .genSalt(SALT_ROUNDS)
            .then(salt => bcrypt.hash(password, salt))
            
        await doc.create({
            name,
            password: hash
        })
        res.status(201).json({
            id: doc.id,
        })
    } catch(e) {
        res.status(500).json({ message: 'Something went wrong, please try again.'})
    }
}

