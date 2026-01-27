import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const carsData = [
    { id: "1", plate: "ABC1234" },
    { id: "2", plate: "XYZ5678" },
  ];

  for (const car of carsData) {
    await prisma["cars"].create({ data: car });
  }

  console.log("Seed finalizado!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
