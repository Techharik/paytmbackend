import { z } from 'zod'
import { userModal } from '../modals/usermodal.js';
import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '../config.js';
import { Account } from '../modals/bankSchema.js';


const registerSchema = z.object({
    username: z.string().email(),
    password: z.string(),
    firstname: z.string(),
    lastname: z.string()
})

const LoginSchema = z.object({
    username: z.string().email(),
    password: z.string()
})

const signUp = async (req, res) => {
    const body = req.body;
    const { success } = registerSchema.safeParse(body)

    if (!success) {
        return res.status(401).json({
            success: false,
            message: 'validation failed'
        })
    }

    const userExists = await userModal.findOne({
        username: body.username
    })


    if (userExists) {
        return res.status(401).json({
            success: false,
            message: 'User already exists and login'
        })
    }

    try {
        const newUser = await userModal.create({
            ...body,

        })
        const initalAccountBalance = Math.floor(Math.random() * 10000);
        console.log(initalAccountBalance);

        const balance = await Account.create({
            userId: newUser._id,
            balance: initalAccountBalance
        })


        const token = jwt.sign({
            userId: newUser.id,
        }, JWT_TOKEN, { expiresIn: '5h' })

        res.status(200).json({
            success: true,
            data: token,
            message: 'user register Successfully'
        })

    } catch (e) {
        res.status(404).json({
            success: false,
            message: 'Unexpected error' + e
        })
    }

}

const signIn = async (req, res) => {
    const body = req.body
    const { success } = LoginSchema.safeParse(body)

    if (!success) {
        return res.status(401).json({
            success: false,
            message: 'validation failed'
        })
    }

    const userExists = await userModal.findOne({
        username: body.username
    }).select('+password')

    if (!userExists) {
        return res.status(401).json({
            success: false,
            message: 'User Not found'
        })
    }

    const verifyPassword = userExists.password === body.password

    if (!verifyPassword) {
        return res.status(400).json({
            success: false,
            message: 'Incorrect password'
        })
    }

    try {

        const token = jwt.sign({
            userId: userExists.id,
        }, JWT_TOKEN, { expiresIn: '5h' })

        res.status(200).json({
            success: true,
            data: token,
            message: 'user LoggedIn Successfully'
        })

    } catch (e) {
        res.status(404).json({
            success: false,
            message: 'Unexpected error' + e
        })
    }
}


export {
    signUp, signIn
}