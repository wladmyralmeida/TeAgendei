import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionsController {
    public async validade(request: Request, response: Response): Promise<any> {
        try {
            const { email, password } = request.body;

            const authenticateUser = new AuthenticateUserService();

            const token = await authenticateUser.execute({
                email,
                password,
            });

            return response.json(token);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export default new SessionsController();
