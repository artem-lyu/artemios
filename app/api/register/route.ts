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
    // Wait for the result of the asynchronous call
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // Check if the user already exists
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists!' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        email,
      },
    });

    // Convert the id to a string (if needed by your application)
    const userWithStringId = {
      ...user,
      id: user.id.toString(),
    };

    return NextResponse.json(userWithStringId, { status: 201 });
  } catch (error) {
    // Handle different types of errors appropriately
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
