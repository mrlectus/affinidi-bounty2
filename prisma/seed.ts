import jobs from "./jobs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  try {
    console.log("seeding");
    jobs.forEach(async (job) => {
      await prisma.job.create({
        data: job,
      });
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
  }
};

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
