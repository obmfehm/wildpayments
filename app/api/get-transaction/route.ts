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
    const transactionId = searchParams.get("id");

    if (!transactionId) {
      throw new Error("Transaction ID missing");
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: parseInt(transactionId),
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new Error("Transaction wasn't found");
    }

    const { customer, ...modifiedTransaction } = transaction;

    return NextResponse.json(
      { ...modifiedTransaction, customerName: customer.name },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
