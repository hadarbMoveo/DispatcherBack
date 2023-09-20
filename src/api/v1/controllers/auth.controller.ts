import { Router, Request, Response } from 'express';
import Article from '../../../db/models/user.model';
import axios from 'axios';

class AuthController {

    public router: Router;

    constructor() {
      this.router = Router();
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/register', this.register.bind(this))
        this.router.post('/login', this.login.bind(this))
        this.router.post('/logout', this.logout.bind(this))
    }

    private async register(req: Request, res: Response) {}

    private async login(req: Request, res: Response) {}

    private async logout(req: Request, res: Response) {}
}

export default AuthController;
