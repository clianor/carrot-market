import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  new Array(500).fill(0).forEach(async (_, index) => {
    await client.stream.create({
      data: {
        name: String(index),
        description: String(index),
        price: index,
        user: {
          connect: {
            id: 10,
          },
        },
      },
    });
    console.log(`${index + 1}/500`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
