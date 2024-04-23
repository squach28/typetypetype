import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from '../config/firebase-adminsdk.json'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
})

export const adminFirestore = admin.firestore()
