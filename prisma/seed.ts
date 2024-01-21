import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test", 12);
  const admin = await prisma.user.create({
    data: {
      email: "admin@wildpayments.com",
      password,
      role: "admin",
    },
  });
  const user = await prisma.user.create({
    data: {
      email: "user@wildpayments.com",
      password,
      role: "user",
    },
  });
  const customer = await prisma.customer.create({
    data: {
      name: "Inpay",
      address: "Toldbodgade 55B",
      city: "København",
      country: "Danmark",
      zip: "1253",
    },
  });
  const customer2 = await prisma.customer.create({
    data: {
      name: "Paypal",
      address: "Fifth Av",
      city: "New York",
      country: "USA",
      zip: "10003",
    },
  });
  const customer3 = await prisma.customer.create({
    data: {
      name: "Tesco",
      address: "Oxford Street",
      city: "London",
      country: "England",
      zip: "W1d 2HS",
    },
  });

  const transaction = await prisma.transaction.createMany({
    data: [
      {
        amount: 234345,
        currency: "DKK",
        receiver: "Johns Pizza",
        customerId: customer.id,
      },
      {
        amount: 100555,
        currency: "DKK",
        receiver: "Elgiganten",
        customerId: customer.id,
      },
      {
        amount: 6456456,
        currency: "DKK",
        receiver: "Johns Burger",
        customerId: customer.id,
      },
      {
        amount: 647652,
        currency: "DKK",
        receiver: "Fona",
        customerId: customer.id,
      },
      {
        amount: 543634,
        currency: "DKK",
        receiver: "Power",
        customerId: customer.id,
      },
      {
        amount: 56765,
        currency: "DKK",
        receiver: "Cinemaxx",
        customerId: customer.id,
      },
      {
        amount: 346435,
        currency: "DKK",
        receiver: "Johns Pizza",
        customerId: customer.id,
      },
      {
        amount: 4523523,
        currency: "DKK",
        receiver: "Johns Pizza",
        customerId: customer.id,
      },
      {
        amount: 456465,
        currency: "DKK",
        receiver: "Johns Pizza",
        customerId: customer.id,
      },
    ],
  });

  const transaction2 = await prisma.transaction.createMany({
    data: [
      {
        amount: 654623,
        currency: "USD",
        receiver: "Facebook",
        customerId: customer2.id,
      },
      {
        amount: 4564564,
        currency: "USD",
        receiver: "Instagram",
        customerId: customer2.id,
      },
      {
        amount: 4564545,
        currency: "USD",
        receiver: "Liberty Bagels",
        customerId: customer2.id,
      },
      {
        amount: 8675,
        currency: "USD",
        receiver: "Joe's Pizza",
        customerId: customer2.id,
      },
      {
        amount: 100000,
        currency: "USD",
        receiver: "Foot Locker",
        customerId: customer2.id,
      },
      {
        amount: 456456,
        currency: "USD",
        receiver: "JD Sport",
        customerId: customer2.id,
      },
      {
        amount: 5676556,
        currency: "USD",
        receiver: "Nike",
        customerId: customer2.id,
      },
      {
        amount: 678678,
        currency: "USD",
        receiver: "Nike",
        customerId: customer2.id,
      },
      {
        amount: 456465,
        currency: "USD",
        receiver: "Nike",
        customerId: customer2.id,
      },
    ],
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
