import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import 'dotenv/config';

import { routes } from './routes';

// Server setup
const port = process.env.PORT || 3030;
const server = express();

server.engine('handlebars', engine());
server.set('view engine', 'handlebars');
server.set('views', './views');

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(path.resolve('./public'))));

server.use('/', routes);

// Server start
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
