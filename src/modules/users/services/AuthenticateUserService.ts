import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserSerivce {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email }});

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        //1. Informação que vai precisar utilizar. Ex: Permissão.
        //2. Chave secreta qualquer. Ex: text in md5.
        //3. Configurações do token.
        const token = sign({}, secret, {
            subject: user.uuid,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserSerivce;
