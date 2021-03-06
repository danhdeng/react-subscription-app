import User from '../models/user';
const { body, validationResult } = require('express-validator');
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../utils/iGetUserAuthInfoRequest';
import stripe from '../utils/stripe';

exports.signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        errors: [
          {
            msg: 'Email already in use',
          },
        ],
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await stripe.customers.create(
      {
        email,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      stripeCustomerId: customer?.id,
    });

    const token = await JWT.sign(
      { email: newUser.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 360000,
      }
    );

    return res.json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          stripeCustomerId: newUser.stripeCustomerId,
        },
      },
    });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
};

exports.login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        errors: [
          {
            msg: 'invalids credentials',
          },
        ],
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        errors: [
          {
            msg: 'invalids password',
          },
        ],
        data: null,
      });
    }

    const token = await JWT.sign(
      { email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 360000,
      }
    );

    return res.json({
      errors: [],
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          stripeCustomerId: user.stripeCustomerId,
        },
      },
    });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
};

exports.profile = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const user = await User.findOne({ email: req.user });

    if (!user) {
      return res.json({
        errors: [
          {
            msg: 'invalids credentials',
          },
        ],
        data: null,
      });
    }
    return res.json({
      errors: [],
      data: {
        user: {
          id: user._id,
          email: user.email,
          stripeCustomerId: user.stripeCustomerId,
        },
      },
    });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
};
