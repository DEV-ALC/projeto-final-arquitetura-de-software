import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const carsData = [
    { plate: "ABC1234" },
    { plate: "ABC5678" },
    { plate: "DEF1234" },
    { plate: "DEF5678" },
    { plate: "HIJ1234" },
    { plate: "HIJ5678" },
    { plate: "KLM1234" },
    { plate: "KLM5678" },
  ];

  for (const car of carsData) {
    await prisma["cars"].create({ data: car });
  }

  console.log("Seed finalizado!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
