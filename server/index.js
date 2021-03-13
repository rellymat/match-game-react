import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import gameRouter from './routes/gameRouter.js'
import autoRouter from './routes/userRouter.js'
import { wakeDyno } from 'heroku-keep-awake'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())




app.use('/game', gameRouter)
app.use('/auth', autoRouter)
app.get('/', (req, res) => {
    mongoose.connect (process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
    wakeDyno(process.env.DYNO_URL)
    res.send("Hi match game api")
})





mongoose.set('useFindAndModify', false)

const PORT = process.env.PORT || 5000;
app.listen(PORT)