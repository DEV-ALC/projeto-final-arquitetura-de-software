import { injectable } from "inversify";
import { Rental } from "../../../domain/entities/Rental";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { TYPES } from "../../../infra/container/Types";
import { CreateRentalDTO } from "./CreateRentalDTO";
import { inject } from "inversify";

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject(TYPES.RentalRepository) private rentalRepository: IRentalRepository,
    @inject(TYPES.CarRepository) private carRepository: ICarRepository,
  ) {}
  async execute(dto: CreateRentalDTO) {
    const car = await this.carRepository.findByPlate(dto.plate);
    if (!car) {
      await this.carRepository.create({ id: "", plate: dto.plate });
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
      throw new Error("O usuario ja tem um alugel");
    }

    const agora = new Date();
    const diferencaMs = dto.dataPrevista.getTime() - agora.getTime();
    if (diferencaMs < 1000 * 60 * 60 * 24) {
      throw new Error("A duraçao minima do aluguel é 24 horas");
    }

    const rental = new Rental("", dto.plate, dto.idUser, dto.dataPrevista);

    return this.rentalRepository.create(rental);
  }
}
