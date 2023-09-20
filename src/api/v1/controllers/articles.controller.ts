import { Router, Request, Response } from 'express';
import axios from 'axios';

class ArticlesController {

    public router: Router;
    private apiKey = process.env.API_KEY
    private baseUrl = process.env.BASE_URL
  
    constructor() {
      this.router = Router();
      this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/getAll', this.getAllArticles.bind(this))
        this.router.get('/getSearch', this.getArticlesBySearch.bind(this))
    }

    private async getAllArticles(req: Request, res: Response) {
        try {
            const articlesNumber = req.query.pageSize
            const page = req.query.page;
            
            if (this.isNullOrUndefined(articlesNumber) || this.isNullOrUndefined(page)) {
                res.status(400).send('parameter "page" and "articlesNumber" is required.');
                return;
            }
            const url = `${this.baseUrl}/top-headlines?country=us&apiKey=${this.apiKey}&pageSize=${articlesNumber}&page=${page}`;

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
            const query = req.query.q;
            
            if (!query) {
                res.status(400).send('Search query parameter "q" is required.');
                return;
            }
            
            const url = `${this.baseUrl}/everything?q=${query}&apiKey=${this.apiKey}`;

            const response = await axios.get(url);
            const articles = response.data
            
            res.json(articles); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching search results');
        }
    }

    isNullOrUndefined(value:any) {
        return value == null || value == undefined;
    }
}

export default ArticlesController;
