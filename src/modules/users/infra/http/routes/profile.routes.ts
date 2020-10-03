import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

//Faz com que todas as rotas de perfil só sejam acessadas com usuário logado
//E às quais são, consegue-se obter o id através do request.id;
profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
