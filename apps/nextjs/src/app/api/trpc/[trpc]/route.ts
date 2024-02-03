import { type NextRequest } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@graysky/api";

// export const runtime = "edge";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req: req,
    createContext: createTRPCContext,
    onError: (err) => {
      console.log("TRPC Error", err);
      Sentry.captureException(err);
    },
  });

export { handler as GET, handler as POST };
