import { db } from "@/app/db";
import { inngest } from "./client";
import { UserTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export const syncUser = inngest.createFunction(
  { id: "sync-user-from-clerk" }, // ←The 'id' is an arbitrary string used to identify the function in the dashboard
  { event: "clerk/user.created" }, // ← This is the function's triggering event
  async ({ event }) => {
    const user = event.data; // The event payload's data will be the Clerk User json object
    const { id, first_name, last_name } = user;
    const email = user.email_addresses.find(
      (e: any) => e.id === user.primary_email_address_id
    ).email;
    await db.insert(UserTable).values({ userId: id, credits: 5 });
  }
);

export const decrementCredits = inngest.createFunction(
  { id: "decrement-credits" },
  { event: "internal/credits.decrement" },
  async ({ event }) => {
    const credits = event.data.credits;
    const userId = event.data.userId;

    if (credits <= 0) {
      return {
        message: "cannot decrement credits",
        credits: 0,
      };
    } else {
      const newCredits = credits - 1;

      const updatedCredits = await db
        .update(UserTable)
        .set({ credits: newCredits })
        .where(eq(UserTable.userId, userId))
        .returning({ credits: UserTable.credits });

      return {
        message: "credits decrement sucessfully",
        credits: updatedCredits[0].credits,
      };
    }
  }
);
