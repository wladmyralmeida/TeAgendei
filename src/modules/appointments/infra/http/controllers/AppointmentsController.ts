import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        //Não vai pegar o user_id do body, pois precisa estar logado;
        const { provider_id, date } = request.body;

        const user_id = request.user.id;

        const parsedDate = parseISO(date);

        //Carregar o service, ver no seu constructor se ele tá precisando de qualquer dependencia
        //E vai no container com a dependencia passada e retorna a instancia dela;
        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
            user_id,
        });

        return response.json(appointment);
    }
}
