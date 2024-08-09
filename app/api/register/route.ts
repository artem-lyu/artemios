import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password } = await req.json();

  // Check for minimum password length
  if (password.length < 12) {
    return NextResponse.json({ message: 'Password must be at least 12 characters long' }, { status: 400 });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists!' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 1);

    // Create the new user and associated account
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        accounts: {
          create: {
            type: 'credentials',
            provider: 'credentials',
            providerAccountId: email,
            password: hashedPassword, // Storing the hashed password
          },
        },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
