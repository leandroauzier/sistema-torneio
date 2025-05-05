import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    const body = await req.json();

    if (!body.name || !body.email || !body.password) {
        return NextResponse.json({ error: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: body.email },
    });
    if (existingUser) {
        return NextResponse.json({ error: "Email já cadastrado." }, { status: 400 });
    }


    const hashedPassword = await bcrypt.hash(body.password, 12);

    const novo = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashedPassword
        },
    });

    const { password, ...userWithoutPassword } = novo;

    return NextResponse.json({ "Usuario criado": userWithoutPassword }, { status: 201 });
}