import { Router, Request, Response } from 'express';

class V1Routes {
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.get('/', (req: Request, res: Response) => {
        res.send('Hello From API !');
      });
    }
  }
  
  const v1Routes = new V1Routes().router;
  export default v1Routes;