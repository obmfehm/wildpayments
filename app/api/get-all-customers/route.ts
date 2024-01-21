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

    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
