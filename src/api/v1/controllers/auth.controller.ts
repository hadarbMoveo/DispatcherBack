import { Router, Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import User from '../../../db/models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

class AuthController {

  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', this.register.bind(this));
    this.router.post('/login', this.login.bind(this));
    this.router.post('/logout',this.logout.bind(this)); 
  }

  private async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const newUser = new User({ email, password });
      await newUser.save();
      const token = sign({ userId: newUser._id }, JWT_SECRET);

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }

  private async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password });

      if (!user) {
        return res.status(401).json({ error: 'Login failed' });
      }

      const token = sign({ userId: user._id }, JWT_SECRET);
      const responseObj = {
        token: token
    };
    res.json(responseObj);
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }

  private async logout(req: Request, res: Response) {
    res.status(200).json({ message: 'Logout successful' });
  }

  static authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]
  
    if (!token) {
      return res.status(401).json({ error: 'Authentication failed: Token missing' });
    }
  
    verify(token, JWT_SECRET, (err) => {
      if (err) {
        return res.status(401).json({ error: 'Authentication failed: Invalid token' });
      }
      next();
    });
  }
}


export default AuthController;

