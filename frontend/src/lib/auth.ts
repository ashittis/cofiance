import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Single-admin credentials auth. Username/password live in env; on success we
// mint a JWT session. The admin API key is never exposed to the client — it's
// only read server-side in lib/admin.ts when calling the FastAPI backend.
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = process.env.ADMIN_EMAIL ?? "admin@confiance.services";
        const password = process.env.ADMIN_PASSWORD ?? "confiance123";
        if (
          credentials?.email === email &&
          credentials?.password === password
        ) {
          return { id: "admin", name: "Admin", email };
        }
        return null;
      },
    }),
  ],
};
