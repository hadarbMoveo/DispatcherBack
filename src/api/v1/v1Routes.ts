import { Router, Request, Response } from 'express';
import ArticlesController from './controllers/articles.controller'

class V1Routes {
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
     const articlesController = new ArticlesController()
      this.router.use('/articles', articlesController.router);
    }
  }
  
  const v1Routes = new V1Routes().router;
  export default v1Routes;
