import { withAuth } from "next-auth/middleware";

// Protect the admin area (but not the login page). Unauthenticated requests are
// redirected to /admin/login.
export default withAuth({
  pages: { signIn: "/admin/login" },
});

export const config = {
  matcher: ["/admin", "/admin/applicants", "/admin/outlets"],
};
