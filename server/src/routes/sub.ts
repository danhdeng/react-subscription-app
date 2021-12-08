import express from 'express';

const { getPrices, addSessions } = require('../controllers/subsController');
// const { validateUser } = require('../validators/userValidator');
const { checkAuth } = require('../middleware/checkAuth');

const router = express.Router();

router.get('/prices', checkAuth, getPrices);

router.post('/sessions', checkAuth, addSessions);
export default router;
