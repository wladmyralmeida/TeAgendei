import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

//Faz com que todas as rotas de perfil só sejam acessadas com usuário logado
//E às quais são, consegue-se obter o id através do request.id;
profileRouter.use(ensureAuthenticated);

profileRouter.put('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string()
                .valid(Joi.ref('password')),
    }
}), profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
