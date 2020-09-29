import 'reflect-metadata';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
    //Ler semanticamente melhor do que test
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '1234567',
        });

        expect(appointment).toHaveProperty('uuid');
        expect(appointment.provider_id).toBe('1234567')
    });

    // it('should not be able to create two appointments on the same time', () => {
    //     expect().toBe();
    // })
});
