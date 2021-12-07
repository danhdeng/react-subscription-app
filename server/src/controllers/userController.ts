import User from '../models/user';
const { body, validationResult } = require('express-validator');

exports.signup = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    await User.create({ email: email, password: password });
    res.status(200).send({ success: true, message: 'user create' });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
};
