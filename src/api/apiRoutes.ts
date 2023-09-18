import { Router, Request, Response } from 'express';

class ApiRoutes {
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

const apiRoutes = new ApiRoutes().router;
export default apiRoutes;