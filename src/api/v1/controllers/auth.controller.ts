import { Router, Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import User from '../../../db/models/user.model';
import {JWT_SECRET}  from '../../../middleware/authMiddleware'; 

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
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const responseObj = {
          status: "failed",
          token: "",
          message: "Email already exists",
        };
        return res.status(400).json(responseObj);
      }
      else {  
      try {
        const newUser = new User({ email, password });
        await newUser.save();
        const token = sign({ userId: newUser._id }, JWT_SECRET);
  
        const responseObj = {
          status: "success",
          token: token,
          message: "",
        };
        res.status(200).json(responseObj);
      }catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
  }
}

  private async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        const responseObj = {
          status: "failed",
          token: "",
          message: "No user found with this email.",
        };
        return res.status(401).json(responseObj);
      }
  
      if (password !== user.password) {
        const responseObj = {
          status: "failed",
          token: "",
          message: "Password does not match the email.",
        };
        return res.status(401).json(responseObj);
      }
  
      const token = sign({ userId: user._id }, JWT_SECRET);
      const responseObj = {
        status: "success",
        token: token,
        message: "",
      };
  
      res.json(responseObj);
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: 'Login failed' });
    }
  }

  private async logout(req: Request, res: Response) {
    res.status(200).json({ message: 'Logout successful' });
  }
}

export default AuthController;

