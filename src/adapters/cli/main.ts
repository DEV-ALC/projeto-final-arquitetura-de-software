import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import { container } from "../../infra/container";

async function main() {
  const useCase = container.get(CreateRentalUseCase);

  const rental = await useCase.execute({
    plate: "XYZ5678",
    idUser: "user-2",
    dataPrevista: new Date("2026-01-28"),
  });

  console.log("Rental:", rental);
}

main();
