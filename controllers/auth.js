import mongoose from "mongoose"
import Author from "../models/Author.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { token } from "morgan"

export default async function login(req, res) {
    try {
        const { email, password } = req.body
        //verifica email
        const user = await Author.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "wrong credentials" })
        }
        //verifica password
        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(401).json({ message: "wrong credentials" })
        }
        jwt.sign({
            id: user.id,
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            },
            function (error, jwtToken) {
                if (error) {
                    res.status(500).json({ message: error.message })
                } else {
                    res.json({
                        token: jwtToken
                    })
                }
            }
        )
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export async function me(req, res) {
    try {
        res.status(200).json(req.authUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}