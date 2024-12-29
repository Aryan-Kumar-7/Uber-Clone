import { Router } from 'express';
import { body } from 'express-validator';
import { getUser, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { authUser } from '../midllewares/authMiddleware.js';

const router = Router();

router.post('/register', [
    body('firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], loginUser);

router.get('/getuser', authUser, getUser);

router.post('/logout', authUser, logoutUser);

export default router;