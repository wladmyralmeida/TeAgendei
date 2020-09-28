import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

//Middleware para tratativa de erros globais na aplicação;
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        //Se é um erro originado através da aplicação - conhecido;
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }

        console.error(err);

        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    },
);

app.listen(3333, () => {
    console.log('Server started on port 3333!❤');
});
