import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

class AppointmentController {
    public async getAll(request: Request, response: Response) {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const appointments = await appointmentsRepository.find();

        return response.json(appointments);
    }

    public async create(request: Request, response: Response) {
        try {
            const { provider_id, date } = request.body;

            const parsedDate = parseISO(date);

            const createAppoint = new CreateAppointmentService();

            const appointment = await createAppoint.execute({
                provider_id,
                date: parsedDate,
            });

            return response.json(appointment);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export default new AppointmentController();
