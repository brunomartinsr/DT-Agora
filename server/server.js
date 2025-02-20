import express from 'express'
import cors from 'cors'
import router from './routes/routes.js'
//import jwt from 'jsonwebtoken'

const app = express()
const PORT = 3000
//const SECRET_KEY = 'meu segredo'

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`rodando em: http://localhost:${PORT}`)
})