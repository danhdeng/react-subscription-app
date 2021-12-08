import { Request, Response } from 'express';

exports.getPrices = async (req: Request, res: Response) => {
  res.send('get prices');
};
