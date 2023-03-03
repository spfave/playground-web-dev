import path from 'path';
import * as fs from 'fs/promises';
import { Router, Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import formidable, { File } from 'formidable';
import 'dotenv/config';

export const routes = Router();

// View routes
routes
	.get('/fe-widget', (req: Request, res: Response) => res.render('fe-widget'))
	.get('/fe-direct-api', (req: Request, res: Response) => res.render('fe-direct-api'))
	.get('/be-sdk', (req: Request, res: Response) => res.render('be-sdk'))
	.get('/', (req: Request, res: Response) => res.render('home'));

// API routes
routes.post('/api/be-sdk', async (req: Request, res: Response) => {
	console.info(`API BE-SDK`); //LOG
	console.info(`req.body: `, req.body); //LOG

	const form = new formidable.IncomingForm();
	form.parse(req, async (_err, fields, files) => {
		console.info(`fields: `, fields); //LOG
		console.info(`files: `, files); //LOG

		const file = files.file as File; // declare type since single upload
		console.info(`file: `, file); //LOG

		try {
			const tempFilePath = await saveTempImage(file);
			const cloudinaryResponse = await uploadImage(tempFilePath);
			console.info(`cloudinaryResponse: `, cloudinaryResponse); //LOG
			await deleteTempImage(tempFilePath);
			return res.json(cloudinaryResponse);
		} catch (error) {
			console.error(error);
		}
	});
});

// Utility functions
async function saveTempImage(file: File) {
	const localFilePath = file.filepath;
	const tempFilePath = path.resolve('./temp-data') + `\\${file.originalFilename}`;
	const rawData = await fs.readFile(localFilePath);

	try {
		await fs.writeFile(tempFilePath, rawData);
		return tempFilePath;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
}

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});
async function uploadImage(imagePath: string) {
	try {
		const response = await cloudinary.uploader.upload(imagePath, {
			folder: 'demo',
			use_filename: true,
			unique_filename: true,
		});
		return response;
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
}

async function deleteTempImage(imagePath: string) {
	try {
		await fs.unlink(imagePath);
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}
}
