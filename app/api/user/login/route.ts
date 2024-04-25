import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;
const secretKey = "1231bajbsfadsbafashdfasfjabsdfasdfjasdhblwefpq";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const result = await sql`SELECT * FROM users WHERE Email = ${data.email};`;
    const user = result.rows[0];

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ status: 404 });
    }

    if (await bcrypt.compare(data.password, user.passwordhash)) {
      console.log("User logged in");

      // Generate access token
      const accessToken = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "15m",
      });

      // Generate refresh token
      const refreshToken = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "7d",
      });

      // Set refresh token in a cookie
      const cookieHeaderValue = `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${
        7 * 24 * 60 * 60
      }; SameSite=None; Secure`;

      // Send tokens and set the refresh token in the response cookie
      return NextResponse.json(
        { accessToken },
        { headers: { "Set-Cookie": cookieHeaderValue }, status: 200 }
      );
    } else {
      console.log("Invalid password");
      return NextResponse.json({ status: 401 });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
