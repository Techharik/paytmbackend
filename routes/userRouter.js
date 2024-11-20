import express from 'express'

const router = express.Router()

//signup and sign in routes.
import { signIn, signUp } from '../controllers/authController.js';

router.post('/registeruser', signUp)
router.post('/loginuser', signIn)

export default router;