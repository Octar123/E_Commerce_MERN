import express from 'express';
import { login, register } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', protect, (req, res) => {
    res.json({
        message: "You have accessed a protected route!",
        userData: req.user
    });
})

export default router;