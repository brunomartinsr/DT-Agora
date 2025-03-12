import db from '../connection.js'
import bcrypt from 'bcrypt'

export async function getLanguages() {
    try {
        const [languages] = await db.query('SELECT DISTINCT language FROM challenges')

        if(languages.length === 0) {
            return { message: "nenhuma linguagem encontrada "}
        }

        return languages

    } catch(error) {
        console.log("erro ao pegar linguagens")
        throw error
    } 
}

export async function chooseChallenges(difficulty, language) {
    try {
        const [challenges] = await db.query(`SELECT * FROM challenges WHERE type = ? AND language = ?`, [difficulty, language])
        if(challenges.length === 0){
            return { message: 'nenhum desafio encontrado' }
        }

        return challenges

    } catch(error) {
        console.log("erro ao procurar desafio", error)
        throw error
    }
}

export async function getChallengeById(id) {
    try {
        const [challenge] = await db.query('SELECT * FROM challenges WHERE id = ?', [id])

        if(challenge.length === 0){
            return{message: "Desafio especifico nao encontrado"}
        }

        return challenge

    } catch(error) {
        console.log("falha ao buscar desafio especifico", error)
        throw error
    }  
}

export async function getOtherChallenges(filters) {
    try {
        let query = 'SELECT * FROM challenges'
        let queryString = []
        let filterValue = []
        let challenges
        
        if(!filters.area && !filters.language && !filters.difficulty) {
            [challenges] = await db.query(query)
        } 
        else {
            if(filters.area) {
                queryString.push('area = ?')
                filterValue.push(filters.area)
            } 
            if(filters.language) {
                queryString.push('language = ?')
                filterValue.push(filters.language)
            }
            if(filters.difficulty) {
                queryString.push('type = ?')
                filterValue.push(filters.difficulty)
            }
            if(queryString.length > 0) {
                query += ' WHERE ' + queryString.join(' AND ')
            }
            [challenges] = await db.query(query, filterValue)

            if(challenges.length === 0){
                return{message: "nenhum desafio encontrado"}
            }
        }
        
        return challenges
    
    } catch(error) {
        console.log("Erro ao buscar desafios")
        throw error
    }
}

export async function getUser(registerData) {
    const [user] = await db.query('SELECT * FROM user WHERE user_email = ?', [registerData.userEmail])

    if(user.length === 0) {
        return null
    }
    return user[0]
}

export async function checkPassword(password, loginPassword) {
    const isPasswordValid = await bcrypt.compare(password, loginPassword)
    return isPasswordValid
}

export async function userLogin(loginData) {
    try {
        const user = await getUser(loginData)

        if(user === null) {
            return null
        }
        if(!(await checkPassword(loginData.userPassword, user.password))){
            return null
        }

        return user

    } catch(error) {
        console.log("Erro ao logar usuário")
        throw error
    }
}

export async function userRegister(registerData) {
    try {
        let user = await getUser(registerData)

        if(user != null) {
            return true
        }
        
        const hashedPassword = await bcrypt.hash(registerData.userPassword, 10)
        
        await db.query(`INSERT INTO user (user_name, user_email, password) VALUES(?, ?, ?)`, 
            [registerData.userName, registerData.userEmail, hashedPassword]
        )

        return user
    }
    catch(error) {
        console.log("erro ao registrar usuário")
        throw error
    }
}