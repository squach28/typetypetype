import express, { Request, Response } from 'express'

const PORT = process.env.PORT || 2000

const app = express()

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'hello' })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})