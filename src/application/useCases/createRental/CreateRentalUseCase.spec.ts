import { describe, it, expect, beforeEach } from "vitest";
import { IRentalRepository } from "../../../domain/repositories/IRentalRepository";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { InMemoryRentalRepository } from "../../../infra/database/inMemory/InMemoryRentalRepository";
import { InMemoryCarRepository } from "../../../infra/database/inMemory/InMemoryCarRepository";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
describe("CreateRentalUseCase", () => {
  let rentalRepository: IRentalRepository;
  let carRepository: ICarRepository;
  let createRentalUseCase: CreateRentalUseCase;

  beforeEach(() => {
    rentalRepository = new InMemoryRentalRepository();
    carRepository = new InMemoryCarRepository();

    createRentalUseCase = new CreateRentalUseCase(
      rentalRepository,
      carRepository,
    );
  });
  it("Deve cadastrar o carro e retornar Rental", async () => {
    const dataPrevista = new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000);

    const rental = await createRentalUseCase.execute({
      plate: "ABC-1234",
      idUser: "user-1",
      dataPrevista,
    });

    expect(rental).toBeDefined();
    expect(rental.plate).toBe("ABC-1234");
    expect(rental.idUser).toBe("user-1");
  });

  it("Deve lancar um erro ao tentar fazer um aluguel com menos de 24h", async () => {
    const dataPrevista = new Date(Date.now() + 1000 * 60 * 60 * 23);

    await expect(
      createRentalUseCase.execute({
        plate: "ABC-1234",
        idUser: "user-1",
        dataPrevista,
      }),
    ).rejects.toThrow("A duraçao minima do aluguel é 24 horas");
  });

  it("Deve lancar erro caso tente alugar um carro que ja esteja alugado", async () => {
    const dataPrevista = new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000);

    await createRentalUseCase.execute({
      plate: "ABC-1234",
      idUser: "user-1",
      dataPrevista,
    });

    await expect(
      createRentalUseCase.execute({
        plate: "ABC-1234",
        idUser: "user-2",
        dataPrevista,
      }),
    ).rejects.toThrow("O veiculo já esta alugado");
  });

  it("Deve lançar um erro caso tente alugar pra um usuario como aluguel em aberto", async () => {
    const dataPrevista = new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000);

    await createRentalUseCase.execute({
      plate: "ABC-1234",
      idUser: "user-1",
      dataPrevista,
    });

    await expect(
      createRentalUseCase.execute({
        plate: "DEF-5678",
        idUser: "user-1",
        dataPrevista,
      }),
    ).rejects.toThrow("O usuario ja tem um alugel");
  });
});
