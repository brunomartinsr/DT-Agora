import express from 'express'
import cors from 'cors'
import router from './routes/routes.js'
import "./config/passport.js"
import passport from 'passport'
import session from 'express-session'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(router)
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())//processa  requisições de login
app.use(passport.session())//armazena e recupera informações de autentificação

app.listen(PORT, () => {
    console.log(`rodando em: http://localhost:${PORT}`)
})