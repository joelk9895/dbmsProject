import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
const saltRounds = 10;

export async function POST(request: Request) {
  const data = await request.json();
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  try {
    const result =
      await sql`INSERT INTO users (FirstName, LastName, Email, PasswordHash, Admin) VALUES (${data.firstname}, ${data.lastname}, ${data.email}, ${hashedPassword}, false);`;
    NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
  return NextResponse.json({ message: "User created" });
}
export async function GET(request: Request) {
  try {
    const result = await sql`SELECT * FROM users WHERE Admin = false;`;
    let users = result.rows;
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
