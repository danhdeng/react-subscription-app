import { Request, Response } from 'express';
import User from '../models/user';
import  stripe  from "../utils/stripe";
import { IGetUserAuthInfoRequest } from '../utils/iGetUserAuthInfoRequest';


exports.getPrices = async (req: Request, res: Response) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  return res.json(prices);
};

exports.addSessions = async (req:IGetUserAuthInfoRequest, res: Response)=>{
  const user=await User.findOne({ email: req.user});
  const session = await stripe.checkout.sessions.create({
    mode:"subscription",
    payment_method_types:["card"],
    line_items:[{
      price: req.body.priceId,
      quantity: 1,
    },
  ],
  success_url: `${process.env.CLIENT_URL}/articles`,
  cancel_url: `${process.env.CLIENT_URL}/article-plans`,
  customer: user?.stripeCustomerId
  },{
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  return res.json(session);
}
