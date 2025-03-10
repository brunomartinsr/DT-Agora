import jwt from 'jsonwebtoken'

export function generateToken(user) {
    return jwt.sign(
        { 
            id: user.id,
            email: user.user_email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
}

export function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) {
        return res.status(401).json({ message:"Token não fornecido" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error){
            return res.status(401).json({ message:"Token inválido" })
        }

        req.user = decoded
        next()
    })

}