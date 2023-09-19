import { Router, Request, Response } from 'express';
import axios from 'axios';

class ArticlesController {

    public router: Router;
  
    constructor() {
      this.router = Router();
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/getAll', this.getAllArticles.bind(this))
        this.router.get('/getSearch',this.getArticlesBySearch.bind(this))
    }

    private async getAllArticles(req: Request, res: Response) {
        try {
            const apiKey = process.env.API_KEY
            const baseUrl = process.env.BASE_URL
            const url = `${baseUrl}/top-headlines?country=us&apiKey=${apiKey}`;

            const response = await axios.get(url);
            const articles = response.data
            
            res.json(articles); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching articles');
        }
    }

    private async getArticlesBySearch(req: Request, res: Response) {
        try {
            const apiKey = process.env.API_KEY
            const baseUrl = process.env.BASE_URL
            const query = req.query.q;
            
            if (!query) {
                res.status(400).send('Search query parameter "q" is required.');
                return;
            }
            
            const url = `${baseUrl}/everything?q=${query}&apiKey=${apiKey}`;

            const response = await axios.get(url);
            const articles = response.data.articles;
            
            res.json(articles); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching search results');
        }
    }
}

export default ArticlesController;
