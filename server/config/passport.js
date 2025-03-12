import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import db from "./database/connection.js"

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}, async (acessToken, refreshToken, profile, done) => {
    try {
        const [existingUser] = await db.query("SELECT * FROM user WHERE google_id = ?", [profile.id])

        if (existingUser.length > 0) {
            return done(null, existingUser[0])
        }

        const newUser = {
            google_id: profile.id,
            user_email: profile.emails[0].value,
            name: profile.displayName
        }
        console.log("usuario google",newUser)
        const [result] = await db.query(
            "INSERT INTO user (google_id, user_email, name) VALUES (?, ?, ?)", 
            [newUser.google_id, newUser.user_email, newUser.name]
        )

        newUser.id = result.insertId

        done(null, newUser)
    } 
    catch (error) {
        done(error, null)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try{
        const [user] = await db.query("SELECT * FROM user WHERE id = ?", [id])
        done(null, user[0])
        
    }
    catch (error){
        done(error, null)
    }
})