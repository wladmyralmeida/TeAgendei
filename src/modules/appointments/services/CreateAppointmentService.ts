import { injectable, inject } from 'tsyringe';

import { startOfHour, isBefore, getHours } from 'date-fns';
import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
        user_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        //Data manualmente colocada do teste,
        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can't create an appointment on past date");
        }

        if (user_id === provider_id) {
            throw new AppError("You can't create an appointment with yourself");
        }


        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError("You can't only create appointment between 8 am and 5pm yourself");
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
            user_id,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
