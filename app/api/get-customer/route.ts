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
    const customerId = searchParams.get("id");

    if (!customerId) {
      throw new Error("Customer ID missing");
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
      include: {
        transactions: true,
      },
    });

    if (!customer) {
      throw new Error("Customer wasn't found");
    }

    return NextResponse.json({ ...customer }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
