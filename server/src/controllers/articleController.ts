import { Request, Response } from 'express';
import User from '../models/user';
import stripe from '../utils/stripe';
import { IGetUserAuthInfoRequest } from '../utils/iGetUserAuthInfoRequest';
import Article from '../models/article';

exports.getArticles = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const user = await User.findOne({ email: req.user });
  const subscriptions = await stripe.subscriptions.list(
    {
      customer: user?.stripeCustomerId,
      status: 'all',
      expand: ['data.default_payment_method'],
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
  if (!subscriptions.data.length) return res.json([]);
  //@ts-ignore
  const plan = subscriptions.data[0]?.plan?.nickname;

  if (plan === 'Basic') {
    const articles = await Article.find({ access: 'Basic' });
    return res.json(articles);
  } else if (plan === 'Standard') {
    const articles = await Article.find({
      access: { $in: ['Basic', 'Standard'] },
    });
    return res.json(articles);
  } else {
    const articles = await Article.find({});
    return res.json(articles);
  }
  return res.json(plan);
};