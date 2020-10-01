import { uuid } from 'uuidv4';

import User from '../../infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(user => user.uuid === id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { uuid: uuid() }, userData);

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        //Pegar a posição que ele já tá, e dar um replace para atualizar a informação;
        const findIndex = this.users.findIndex(
            findUser => findUser.uuid === user.uuid,
        );

        this.users[findIndex] = user;

        return user;
    }
}

export default FakeUsersRepository;
