import { WorkOS } from "@workos-inc/node";
import { getUser, signOut, getAuthorizationUrl } from "./auth";
import App from "./app";

// const workos = new WorkOS(process.env.WORKOS_API_KEY);

export default async function WithSession() {
  const authKitUrl = getAuthorizationUrl();
  const { isAuthenticated, user } = await getUser();

  return (
    <>
      {isAuthenticated ? (
        <>
          <h2>Welcome back{user?.firstName && `, ${user?.firstName}`}</h2>
          <p>You are now authenticated into the application.</p>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              Sign-out
            </button>
          </form>
        </>
      ) : (
        <>
          <h1>Sign in to join the fun</h1>
          <a
            href={authKitUrl}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Sign in
          </a>
        </>
      )}

      <pre>{JSON.stringify({ user }, null, 2)}</pre>

      <App />
    </>
  );
}
