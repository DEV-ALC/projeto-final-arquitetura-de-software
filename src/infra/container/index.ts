import { Container } from "inversify";
import { TYPES } from "./Types";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { PrismaCarRepository } from "../database/prisma/PrismaCarRepository";
import { PrismaRentalRepository } from "../database/prisma/PrismaRentalRepository";
import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import { PrismaClient } from "@prisma/client";

const container = new Container();

container
  .bind<PrismaClient>(TYPES.PrismaClient)
  .toConstantValue(new PrismaClient());

container
  .bind<ICarRepository>(TYPES.CarRepository)
  .to(PrismaCarRepository)
  .inSingletonScope();
container
  .bind<IRentalRepository>(TYPES.RentalRepository)
  .to(PrismaRentalRepository)
  .inSingletonScope();

container.bind<CreateRentalUseCase>(CreateRentalUseCase).toSelf();

export { container };
