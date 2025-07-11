import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createUser() {
  await client.user.create({
    data: {
      username: "Korella",
      firstName: "Aaditya",
      lastName: "Kumar",
      email: "Aaditya@gamil.com",
      password: "123",
      age: 20,
    },
  });
}

createUser();

