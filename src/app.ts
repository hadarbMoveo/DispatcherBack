import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import errorMiddleware from './middleware/errorMiddleware';
import apiRoutes from './api/apiRoutes';
import './db/mongoose-init';

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeRoutes() {
    this.app.use('/api', apiRoutes);
  }


  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default App;



