import express from 'express';
import 'dotenv/config';

const server = express();

server.listen(process.env.PORT, () =>
	console.log(`Server running on http://localhost:${process.env.PORT}`)
);
