import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const passwordHash = await hash(body.senha, 10);

  const novo = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: passwordHash,
    },
  });

  return NextResponse.json(novo);
}
