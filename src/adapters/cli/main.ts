import { CreateRentalUseCase } from "../../application/useCases/createRental/CreateRentalUseCase";
import { container } from "../../infra/container";

async function main() {
  const useCase = container.get(CreateRentalUseCase);
  const dataPrevista = new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000);
  const rental = await useCase.execute({
    plate: "XYZ5679",
    idUser: "user-3",
    dataPrevista: dataPrevista,
  });

  console.log("Rental:", rental);
}

main();
