import { CreateRentalDTO } from "../../application/useCases/createRental/CreateRentalDTO";
import { Rental } from "../entities/Rental";

export interface IRentalRepository {
  findOpenRentalByPlate(plate: string): Promise<Rental | null>;
  findOpenRentalByUserId(userId: string): Promise<Rental | null>;
  create(rental: Rental): Promise<Rental>;
}
