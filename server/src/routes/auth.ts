import express from 'express';

const { signup, login, profile } = require('../controllers/userController');
const { validateUser } = require('../validators/userValidator');
const { checkAuth } = require('../middleware/checkAuth');

const router = express.Router();

router.post('/signup', validateUser, signup);
router.post('/login', validateUser, login);
router.get('/me', checkAuth, profile);
export default router;
