
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Request } from '../types/express.d';

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed: Token missing' });
  }

  verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication failed: Invalid token' });
    }
    req.user = user;
    next();
  });
}