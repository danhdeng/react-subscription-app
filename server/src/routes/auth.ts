import express from 'express';

const { signup } = require('../controllers/userController');
const { validateUser } = require('../validators/userValidator');

const router = express.Router();

router.post('/signup', validateUser, signup);

export default router;
