// app/callback/route.js
import { NextRequest, NextResponse } from "next/server";
import { WorkOS } from "@workos-inc/node";

// Javascript Object Signing and Encryption (JOSE)
// https://www.npmjs.com/package/jose
import { SignJWT } from "jose";

// Get secret
const secret = new Uint8Array(
  Buffer.from(process.env.JWT_SECRET_KEY!, "base64"),
);

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID!;

export async function GET(req: NextRequest) {
  // The authorization code returned by AuthKit
  const code = req.nextUrl.searchParams.get("code")!;

  const { user } = await workos.userManagement.authenticateWithCode({
    code,
    clientId,
  });

  // Use the information in `user` for further business logic.

  // Cleanup params and redirect to homepage
  const url = req.nextUrl.clone();
  url.searchParams.delete("code");
  url.pathname = "/";

  const response = NextResponse.redirect(url);

  // Create a JWT with the user's information
  const token = await new SignJWT({
    // Here you might lookup and retrieve user details from your database
    user,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  // Store in a cookie
  response.cookies.set({
    name: "token",
    value: token,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return response;
}
