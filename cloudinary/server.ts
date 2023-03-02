import express from 'express';
import 'dotenv/config';

import { routes } from './routes';

// Server setup
const server = express();
server.use('/', routes);

// Server start
server.listen(process.env.PORT, () =>
	console.log(`Server running on http://localhost:${process.env.PORT}`)
);
