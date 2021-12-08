import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { IGetUserAuthInfoRequest } from '../utils/iGetUserAuthInfoRequest';

export const checkAuth = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.header('authorization');
  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: 'unauthorized',
        },
      ],
    });
  }
  token = token.split(' ')[1];
  try {
    const user = (await JWT.verify(
      token,
      process.env.JWT_SECRET as string
    )) as { email: string };
    req.user = user.email;
    next();
  } catch (err) {
    return res.status(403).json({
      errors: [
        {
          msg: 'unauthorized',
        },
      ],
    });
  }
};
