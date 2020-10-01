import { injectable, inject } from 'tsyringe';

// import User from '../infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProider')
        private mailProvider: IMailProvider,
    ) {}

    async execute({ email }: IRequest): Promise<void> {
        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
    }
}
