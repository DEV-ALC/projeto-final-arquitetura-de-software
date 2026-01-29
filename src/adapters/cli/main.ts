import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import { container } from "../../infra/container";

async function main() {
  const useCase = container.get(CreateRentalUseCase);

  const rental = await useCase.execute({
    plate: "XYZ5679",
    idUser: "user-3",
    dataPrevista: new Date("2026-01-31"),
  });

  console.log("Rental:", rental);
}

main();
