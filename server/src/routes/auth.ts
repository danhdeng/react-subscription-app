import express from 'express';

const { signup, login } = require('../controllers/userController');
const { validateUser } = require('../validators/userValidator');

const router = express.Router();

router.post('/signup', validateUser, signup);
router.post('/login', validateUser, login);
export default router;
