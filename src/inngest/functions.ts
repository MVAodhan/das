import { db } from "@/app/db";
import { inngest } from "./client";
import { UserTable } from "@/app/db/schema";

export const insertUser = inngest.createFunction(
  { id: "add-user-to-db" },
  { event: "test/user.insert" },
  async ({ event }) => {
    await db.insert(UserTable).values({ userId: "user_5792561", credits: 5 });
    return { event, body: "User inserted into DB" };
  }
);
