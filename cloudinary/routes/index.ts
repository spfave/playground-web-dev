import { Router, Request, Response } from 'express';

export const routes = Router();

// View routes
routes
	.get('/fe-widget', (req: Request, res: Response) => res.render('fe-widget'))
	.get('/fe-direct-api', (req: Request, res: Response) => res.render('fe-direct-api'))
	.get('/be-sdk', (req: Request, res: Response) => res.render('be-sdk'))
	.get('/', (req: Request, res: Response) => res.render('home'));

// API routes
