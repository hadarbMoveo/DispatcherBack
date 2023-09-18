import * as dotenv from 'dotenv';
dotenv.config();
import App from './app';

const port = Number(process.env.PORT)
const app = new App(port || 3000);
app.listen();