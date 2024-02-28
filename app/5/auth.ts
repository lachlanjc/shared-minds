import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { WorkOS } from "@workos-inc/node";
import type { User } from "@workos-inc/node";

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID!;

export function getAuthorizationUrl() {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    // Specify that we'd like AuthKit to handle the authentication flow
    provider: "AuthKit",

    // The callback endpoint that WorkOS will redirect to after a user authenticates
    redirectUri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/5/callback"
        : "https://shared-minds.vercel.app/5/callback",
    clientId,
  });

  return authorizationUrl;
}

/*
  Because RSC allows running code on the server, you can
  call `getAuthorizationUrl()` directly within a server component:

  function SignInButton() {
    const authorizationUrl = getAuthorizationUrl();
    return <a href={authorizationUrl}>Sign In</a>;
  }
*/

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT_SECRET_KEY is not set");
  }

  return new Uint8Array(Buffer.from(secret, "base64"));
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

// Verify the JWT and return the user
export async function getUser(): Promise<{
  isAuthenticated: boolean;
  user?: User | null;
}> {
  const token = cookies().get("token")?.value;

  if (token) {
    const verifiedToken = await verifyJwtToken(token);
    if (verifiedToken) {
      return {
        isAuthenticated: true,
        user: verifiedToken.user as User | null,
      };
    }
  }

  return { isAuthenticated: false };
}

// Clear the session and redirect to the home page
export async function signOut() {
  cookies().delete("token");
  redirect("/5");
}
