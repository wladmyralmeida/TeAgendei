import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}
export default class CreateUserService {
    async execute({ name, email, password }: RequestDTO): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExist = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExist) {
            throw new AppError('Email addres already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });


        await userRepository.save(user);

        delete user.password;

        return user;
    }
}
