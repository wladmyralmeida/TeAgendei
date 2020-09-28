import { Router } from "express";
import { parseISO } from "date-fns";

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

//SoC: Separation of Concerns (Separação de preocupações);
//DRY : Don't Repeat Yourself;
//Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta (Se precisar, transforme os dados);

// appointmentsRouter.get("/", async (request, response) => {
//   const appointments = await appointmentsRespository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
