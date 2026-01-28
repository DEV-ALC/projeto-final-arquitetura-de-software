import { Container } from "inversify";
import { TYPES } from "./Types";
import { IRentalRepository } from "../../domain/repositories/IRentalRepository";
import { ICarRepository } from "../../domain/repositories/ICarRepository";
import { PrismaCarRepository } from "../database/prisma/CarRepository";
import { PrismaRentalRepository } from "../database/prisma/RentalRepository";

const container = new Container();

container
  .bind<ICarRepository>(TYPES.CarRepository)
  .to(PrismaCarRepository)
  .inSingletonScope();
container
  .bind<IRentalRepository>(TYPES.RentalRepository)
  .to(PrismaRentalRepository)
  .inSingletonScope();

export { container };
