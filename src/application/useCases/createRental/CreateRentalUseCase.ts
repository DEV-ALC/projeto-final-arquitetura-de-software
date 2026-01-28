import { Rental } from "../../../domain/entities/Rental";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { TYPES } from "../../../infra/container/Types";
import { CreateRentalDTO } from "./CreateRentalDTO";
import { inject } from "inversify";

export class CreateRentalUseCase {
  constructor(
    @inject(TYPES.RentalRepository) private rentalRepository: IRentalRepository,
    @inject(TYPES.CarRepository) private carRepository: ICarRepository,
  ) {}
  async execute(dto: CreateRentalDTO) {
    const car = await this.carRepository.findByPlate(dto.plate);
    if (!car) {
      throw new Error("O veiculo não existe na base");
    }
    const existplate = await this.rentalRepository.findOpenRentalByPlate(
      dto.plate,
    );
    if (!!existplate) {
      throw new Error("O veiculo já esta alugado");
    }
    const existuser = await this.rentalRepository.findOpenRentalByUserId(
      dto.idUser,
    );

    if (!!existuser) {
      throw new Error("O ususario ja tem um alugel ");
    }

    const rental = new Rental("", dto.plate, dto.idUser, dto.dataPrevista);

    await this.rentalRepository.create(rental);
  }
}
