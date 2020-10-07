import { Request, Response } from 'express';

import { container } from 'tsyringe';
//Pegar uma ou mais classes e aplicar os métodos do transformer que está no modelo;
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        return response.json({ user: classToClass(user), token });
    }
}
