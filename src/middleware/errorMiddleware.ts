import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send('Error occurred!');
};

export default errorMiddleware;