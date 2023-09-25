const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const main = async () => {
  try {
    await db.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Business & Finance" },
        { name: "Filming" },
        { name: "Engineering" },
      ],
    });

    console.log("Seeding successful");
  } catch (error) {
    console.error(error);
  } finally {
    await db.$disconnect();
  }
};

main();
