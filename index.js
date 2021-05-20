import express from "express";
import cors from "cors"
import dotenv from "dotenv"

import authRouter from './routes/auth.js'

const app = express()

dotenv.config()
const { PORT } = process.env

app.use(cors())
app.use(express.urlencoded({ limit : "30mb", extended : true}))
app.use(express.json())

app.use('/api', authRouter)

app.listen(PORT, (err) => {
  if(err) throw err
  console.log('Server running on 5000')
})
