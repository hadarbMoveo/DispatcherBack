import { Router, Request, Response } from 'express';
import ArticlesController from './controllers/articles.controller'
import AuthController from './controllers/auth.controller'

class V1Routes {
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
     const articlesController = new ArticlesController()
     const authController = new AuthController ()
      this.router.use('/articles', articlesController.router);
      this.router.use('/auth', authController.router);
    }
  }
  
  const v1Routes = new V1Routes().router;
  export default v1Routes;
