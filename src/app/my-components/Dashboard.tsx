import Link from "next/link";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Resize from "./Resize";
import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { UserTable } from "../db/schema";
import { eq } from "drizzle-orm";
export async function Dashboard() {
  const { userId } = auth();

  const credits = await db
    .select({ credits: UserTable.credits })
    .from(UserTable)
    .where(eq(UserTable.userId, userId!));

  console.log(credits[0].credits);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="">DAS</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            {credits[0]?.credits! > 1 && (
              <span>Credits: {credits[0].credits}</span>
            )}
            <UserButton />
          </SignedIn>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <SignedOut>
              <span>Please sign in to use the resizer</span>
            </SignedOut>
            <SignedIn>
              <Resize credits={credits[0]?.credits!} />
            </SignedIn>
          </div>
        </main>
      </div>
    </div>
  );
}
