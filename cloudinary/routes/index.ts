import { Router, Request, Response } from 'express';

export const routes = Router();

// View routes
routes.get('/', (req: Request, res: Response) => {
	res.render('home');
});

// API routes
