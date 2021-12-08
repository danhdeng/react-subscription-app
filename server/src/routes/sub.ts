import express from 'express';

const { getPrices } = require('../controllers/subsController');
// const { validateUser } = require('../validators/userValidator');
const { checkAuth } = require('../middleware/checkAuth');

const router = express.Router();

router.post('/prices', checkAuth, getPrices);
export default router;
