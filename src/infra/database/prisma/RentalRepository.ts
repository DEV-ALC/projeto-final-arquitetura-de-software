import { injectable } from "inversify";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { Rental } from "../../../domain/entities/Rental";
import { PrismaClient } from "@prisma/client";

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
  constructor(private prisma = new PrismaClient()) {}

  async findOpenRentalByPlate(plate: string): Promise<Rental | null> {
    const rental = await this.prisma.rentals.findFirst({
      where: { plate },
    });
    if (!rental) return null;
    return new Rental(
      rental.id,
      rental.plate,
      rental.idUser,
      rental.dataPrevista,
    );
  }

  async findOpenRentalByUserId(idUser: string): Promise<Rental | null> {
    const rental = await this.prisma.rentals.findFirst({
      where: { idUser },
    });
    if (!rental) return null;
    return new Rental(
      rental.id,
      rental.plate,
      rental.idUser,
      rental.dataPrevista,
    );
  }

  async create(rental: Rental): Promise<Rental> {
    const created = await this.prisma.rentals.create({
      data: {
        plate: rental.plate,
        idUser: rental.idUser,
        dataPrevista: rental.dataPrevista,
      },
    });

    return new Rental(
      created.id,
      created.plate,
      created.idUser,
      created.dataPrevista,
    );
  }
}
