import { Request, Response } from 'express';
import stripe from '../utils/stripe';

exports.getPrices = async (req: Request, res: Response) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  return res.json(prices);
};
