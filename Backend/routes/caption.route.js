import { Router } from 'express';
import { body } from 'express-validator';
import { captionLogin, getCaption, logoutCaption, registerCaption } from '../controllers/caption.controller.js';
import { authCaption, authUser } from '../midllewares/authMiddleware.js';

const router = Router();

router.post('/register', [
    body('firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be car, bike or auto'),
], registerCaption);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], captionLogin);

router.get('/getcaption', authCaption, getCaption);

router.post('/logout', authCaption, logoutCaption);

export default router;