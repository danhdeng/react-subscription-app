const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('email')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail()
    .isEmail()
    .withMessage('Invalid Email'),
  check('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Minimum 6 characters required!')
    .bail(),
  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.json({
        errors: errors.array(),
        data: null,
      });
    // return res.status(422).json({ errors: errors.array() });
    next();
  },
];
