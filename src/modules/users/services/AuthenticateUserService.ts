import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class AuthenticateUserSerivce {
    constructor(private usersRepository: IUsersRepository){}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

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
