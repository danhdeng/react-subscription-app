import express from 'express';

const { getArticles } = require('../controllers/articleController');

const { checkAuth } = require('../middleware/checkAuth');

const router = express.Router();

router.get('/', checkAuth, getArticles);

export default router;
