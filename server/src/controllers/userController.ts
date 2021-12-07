import User from '../models/user';
const { body, validationResult } = require('express-validator');
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

exports.signup = async (req: any, res: any) => {
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

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
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
        },
      },
    });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
};

exports.login = async (req: any, res: any) => {
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
        },
      },
    });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
};
