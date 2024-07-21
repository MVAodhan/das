"use server";

import { auth } from "@clerk/nextjs/server";
import { UserTable } from "./db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export async function createUserMessage(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("User not found");

  const message = formData.get("message") as string;
  await db.insert(UserTable).values({
    user_id: user.id,
    message,
  });
}

export async function deleteUserMessage() {
  const { userId } = auth();
  if (!userId) throw new Error("User not found");

  await db.delete(UserTable).where(eq(UserTable.user_id, user.id));
}
