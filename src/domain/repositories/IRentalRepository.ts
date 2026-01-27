import { Rental } from "../entities/Rental";

export interface IRentalRepository {
  findOpenRentalByCarId(carId: string): Promise<Rental | null>;
  findOpenRentalByUserId(userId: string): Promise<Rental | null>;
  create(rental: Rental): Promise<void>;
}
