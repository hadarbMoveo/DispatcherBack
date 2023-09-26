import express, { Application,Request, Response,NextFunction } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import errorMiddleware from './middleware/errorMiddleware';
import apiRoutes from './api/apiRoutes';
import './db/mongoose-init';
const cors = require("cors");

class App {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    
    this.app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({ origin: "*" }))

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  
      next();
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeRoutes() {
    this.app.use('/api', apiRoutes);
    this.app.use("*", (req: Request, res: Response) => {
      res.json({});
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
  
}

export default App;



