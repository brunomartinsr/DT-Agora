import { Router } from "express";
import { chooseChallenges, getChallengeById, getOtherChallenges, getLanguages, userLogin } from "../config/database/repositories/query.js";
import passport from "passport";
import { generateToken, verifyToken } from "../config/auth.js";

const router = Router()

router.get('/languages', async (req, res, next) => {
    try {
        const languages = await getLanguages()

        if(languages === 0){
            res.status(404).json({message: languages.message})
        }

        res.status(200).json(languages)
    } 
    catch(error) {
        next(error)
    }
})

router.post("/questions", async (req, res, next) => {
    try {
        const { answer1, answer2, answer3 } = req.body;
        let recommend_result
        let difficulty = 'Médio'

        if(answer1 < 2 && answer3 == "não") {
            difficulty = 'Fácil'
        } 
        else if(answer1 > 5 && answer3 == "sim") {
            difficulty = 'Difícil'
        } 
       
        recommend_result = await chooseChallenges(difficulty, answer2)
        res.status(200).json(recommend_result)

    } catch (error) {
        next(error)        
    }
})

router.get('/challenge/:id', async (req, res, next) => {
    const {id} = req.params

    try {
        const desafioEncontrado = await getChallengeById(id)

        if(desafioEncontrado.length === 0){
            return res.status(404).json({message: desafioEncontrado.mensage})
        }
        console.log(desafioEncontrado)
        res.status(200).json(desafioEncontrado)

    } catch(error) {
        next(error)
    }
})

router.get('/otherChallenges', async (req, res, next) => {
    try {
        const filters = {
            area: req.query.area,
            language: req.query.language,
            difficulty: req.query.difficulty
        }

        const challenges = await getOtherChallenges(filters)

        if(challenges.length === 0){
            return res.status(404).json({ message: challenges.message })
        }

        res.status(200).json(challenges)

    } catch(error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await userLogin(req.body)

        if(!user){
            return res.status(401).json({ message: "usuário não cadastrado" })
        }

        const token = generateToken(user)
        res.status(200).json({ token })

    } catch(error) {
        next(error)
    }
})

router.get('/auth/google', 
    passport.authenticate('google', { scope:['profile', 'email' ]})
)

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = generateToken(req.user)
        res.redirect(`http://localhost:3000?token=${token}`)
    }
)

//ROTA PARA VERIFICAR INFOS DE PERFIL
// router.get('/profile', verifyToken, (req, res) => {
//     res.json({ message: "Acesso autorizado", user: req.user })
// })

router.post('/signup', (req, res, next) => {
    const userData = req.body

    try {
        const isRegistered = userRegister(userData)

        if(isRegistered === 0) {
            return res.status(401).json({ message: isRegistered.message })
        }

        res.status(200).json(isRegistered)
    
    } catch(error) {
        next(error)
    }

})

router.use((error, req, res, next) => {
    console.log("erro no servidor", error.message)
    res.status(500).json({ message:"Erro interno no servidor" })
})

export default router