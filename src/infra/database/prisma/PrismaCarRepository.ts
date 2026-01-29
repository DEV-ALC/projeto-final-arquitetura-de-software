import { inject, injectable } from "inversify";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { Car } from "../../../domain/entities/Car";
import { PrismaClient } from "@prisma/client";
import { TYPES } from "../../container/Types";

@injectable()
export class PrismaCarRepository implements ICarRepository {
  constructor(@inject(TYPES.PrismaClient) private prisma: PrismaClient) {}

  async findByPlate(plate: string): Promise<Car | null> {
    const car = await this.prisma.cars.findUnique({ where: { plate } });
    if (!car) return null;
    return new Car(car.id, car.plate);
  }

  async create(car: Car): Promise<void> {
    await this.prisma.cars.create({
      data: {
        plate: car.plate,
      },
    });
  }
}
