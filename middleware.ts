import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({ publicRoutes: ["/5"] });

export const config = {
  matcher: ["/5"],
};
