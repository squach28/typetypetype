import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from '../config/firebase-adminsdk.json'
import dotenv from 'dotenv'
dotenv.config()

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
})

export const db = admin.database()
