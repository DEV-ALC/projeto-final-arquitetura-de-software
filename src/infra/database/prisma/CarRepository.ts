import { injectable } from "inversify";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { Car } from "../../../domain/entities/Car";
import { PrismaClient } from "@prisma/client";

@injectable()
export class PrismaCarRepository implements ICarRepository {
  constructor(private prisma = new PrismaClient()) {}

  async findByPlate(plate: string): Promise<Car | null> {
    const car = await this.prisma.cars.findUnique({ where: { plate } });
    if (!car) return null;
    return new Car(car.id, car.plate);
  }
}
