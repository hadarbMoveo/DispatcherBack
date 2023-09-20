import { Router, Request, Response } from 'express';
import Article from '../../../db/models/article.model'
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
        this.router.get('/getFavorites', this.getFavoriteArticles.bind(this))
        this.router.post('/addFavorite', this.addFavoriteArticle.bind(this))
        this.router.delete('/removeFavorite/:id', this.removeFavoriteArticle.bind(this))
    }

    private async getAllArticles(req: Request, res: Response) {
        try {
            const articlesNumber = req.query.pageSize
            const page = req.query.page;
            
            if (this.isNull(articlesNumber) || this.isNull(page)) {
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


    private async getFavoriteArticles(req: Request, res: Response) {
        try {
            const articles = await Article.find();
        
            const responseObj = {
                articles: articles
            };
    
            res.json(responseObj);
          } catch (error) {
            console.error("Error retrieving articles:", error);
            res.status(500).send("Error retrieving articles");
          }
    }

    private async addFavoriteArticle(req: Request, res: Response) {
        try {
          const { article } = req.body;
          const favoriteArticle = new Article(article);
          const savedFavoriteArticle = await favoriteArticle.save();
          const responseObj = {
            ID: savedFavoriteArticle._id
        };
          res.json(responseObj);
        } catch (error) {
          console.error('Error adding favorite article:', error);
          res.status(500).send('Error adding favorite article');
        }
      }

    private async removeFavoriteArticle(req: Request, res: Response) {
        try {
            const _id = req.params.id;
            const removedArticle = await Article.findByIdAndRemove(_id);
        
            if (!removedArticle) {
              return res.status(404).json({ message: "faild" });
            }
        
            return res.json({ message: "successes" });
          } catch (error) {
            console.error("Error removing article:", error);
            return res.status(500).send("Error removing article");
          }
    }

    isNull(value:any) {
        return value == null;
    }

}

export default ArticlesController;
