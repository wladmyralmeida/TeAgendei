import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

//Criar tipos de forma mais declarativa [ { day: 1, available: true, } ];
type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        //First: Pegar todos os agendamentos no mês, horário e do prestador - AppointmentsRepository;
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id,
                year,
                month,
            },
        );

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        //Array a partir do número de dias que o mês tem;
        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const compareDate = new Date(year, month - 1, day, 23, 59, 59);

            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            return {
                day,
                //TODO: Modificar aqui para ser possível que o usuário defina o seu próprio
                //horário de atendimento;
                //Verificar se a data daquele dia de comparação é depois de agora, se for, true.
                available:
                    isAfter(compareDate, new Date()) &&
                    appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;
