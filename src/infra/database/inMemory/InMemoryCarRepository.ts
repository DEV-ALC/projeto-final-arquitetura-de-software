import { injectable } from "inversify";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { Car } from "../../../domain/entities/Car";

@injectable()
export class InMemoryCarRepository implements ICarRepository {
  private cars: Car[] = [];

  async findByPlate(plate: string): Promise<Car | null> {
    const car = this.cars.find((r) => r.plate === plate);
    return car ?? null;
  }

  async create(car: Car): Promise<void> {
    if (!car.id) {
      car.id = Date.now().toString(36);
    }
    this.cars.push(car);
  }
}
