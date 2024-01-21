import isUserAdmin from "@/app/utils/authorize";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const isUserAuhorized = await isUserAdmin();
    if (!isUserAuhorized) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get("customerId");

    const transactions = await prisma.transaction.findMany({
      where: customerId
        ? {
            customerId,
          }
        : {},
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
    });

    const result = transactions.map((transaction) => {
      const { customer, ...modifiedTransaction } = transaction;
      return {
        ...modifiedTransaction,
        customerName: transaction.customer.name,
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
