import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class UsersController {
    public async create(request: Request, response: Response) {
        try {
            const { name, email, password } = request.body;

            const createUser = new CreateUserService();

            const user = await createUser.execute({ name, email, password });

            return response.json(user);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export default new UsersController();
