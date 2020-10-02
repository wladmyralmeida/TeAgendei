import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';

import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUsersRepository';
import IUsersTokenRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUserRepository,

        @inject('UserTokensRepository')
        private usersTokensRepository: IUsersTokenRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists');
        }

        const user = await this.userRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.userRepository.save(user);
    }
}

export default ResetPasswordService;
