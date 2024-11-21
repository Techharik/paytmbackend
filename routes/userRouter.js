import express from 'express'

const router = express.Router()

//signup and sign in routes.
import { signIn, signUp } from '../controllers/authController.js';
import { searchFilter, updateUserInfo, bankBalance, transferAmount } from '../controllers/userController.js';
import { authMiddleware } from '../utils/authMiddle.js';

router.post('/registeruser', signUp)
router.post('/loginuser', signIn)
router.put('/updateUser', authMiddleware, updateUserInfo)
router.get('/searchbulk', authMiddleware, searchFilter)
router.get('/checkbalance', authMiddleware, bankBalance)
router.post('/transferbalance', authMiddleware, transferAmount)




export default router;