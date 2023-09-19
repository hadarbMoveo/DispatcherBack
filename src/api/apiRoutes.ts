import { Router } from 'express';
import v1Routes from './v1/v1Routes'

class ApiRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/v1', v1Routes);
  }
}

const apiRoutes = new ApiRoutes().router;
export default apiRoutes;