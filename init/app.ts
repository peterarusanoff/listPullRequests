import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import httpServer from 'http';
import path from 'path';
import morgan from 'morgan';

import logger from './logger';
import api from './routes';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const server = httpServer.createServer(app);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', api);

// catch 404 and forward to error handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not Found' });
});

const onListening = async () => {
    try {
        const addr = server.address();
        console.log(`Express server:${JSON.stringify(addr, null, 4)} Listening on: ${port}`);
    } catch (error) {
        logger.error(error);
    }
};

server.listen(port);
server.on('listening', onListening);

export default app;
