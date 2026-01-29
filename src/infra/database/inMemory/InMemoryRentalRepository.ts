import { injectable } from "inversify";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental } from "../../../domain/entities/Rental";

@injectable()
export class InMemoryRentalRepository implements IRentalRepository {
  private rentals: Rental[] = [];

  async findOpenRentalByPlate(plate: string): Promise<Rental | null> {
    const rental = this.rentals.find((r) => r.plate === plate);
    return rental ?? null;
  }

  async findOpenRentalByUserId(idUser: string): Promise<Rental | null> {
    const rental = this.rentals.find((r) => r.idUser === idUser);
    return rental ?? null;
  }

  async create(rental: Rental): Promise<Rental> {
    if (!rental.id) {
      rental.id = Date.now().toString(36);
    }

    this.rentals.push(rental);
    return rental;
  }
}
