import { Request, Response } from "express";
import { adminFirestore } from "../utils/db";

const COLLECTION_NAME = 'rooms'

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body
        const doc = adminFirestore.collection(COLLECTION_NAME).doc().create({
            name,
            password
        })
        res.status(201).json({})
    } catch(e) {
        res.status(500).json({ message: 'Something went wrong, please try again.'})
    }
}

