
import prisma from "@/lib/prisma";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const userExists = await prisma.user.findUnique({
        where: {
            email,
        },
        });
    if (userExists) {
        return NextResponse.json({ message: "Account already exists. Please login" }, {status: 401});
    }
    await prisma.user.create({
        data: {
            email,
            password,
        },
        });
    await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}