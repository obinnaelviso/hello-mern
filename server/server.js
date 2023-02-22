import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
const PORT = 4000

app.use(cors)

const mongodb = await mongoose
  .connect('mongodb+srv://obinnaelviso:iHUal4SW3Ue2xYuH@cluster0.paszhok.mongodb.net/?retryWrites=true&w=majority')

console.log("mongodb connection successful")

app.get('/', (request, response) => {
  response.send("Hello world")
})

app.listen(PORT, () => {
  console.log("Server started @ http://localhost:" + PORT)
})