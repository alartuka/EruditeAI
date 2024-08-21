import { authMiddleware } from "@clerk/nextjs/server";
import { clerkClient } from '@clerk/nextjs/server';
const clerk = clerkClient();

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/generate", "/api/generate"]

});


export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};