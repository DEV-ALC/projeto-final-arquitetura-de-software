import { Car } from "../entities/Car";

export interface ICarRepository {
  findByPlate(plate: string): Promise<Car | null>;
  create(car: Car): Promise<void>;
}
