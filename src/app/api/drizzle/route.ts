import { db } from "@/app/db";
import { UserTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  // return db.select().from(UserTable).where(eq(UserTable.id, id));
  const id = "user_2jETSxJuFSWjJv5m6Rxp6EXCqHM";
  const credits = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.user_id, id));

  console.log(credits);
  return Response.json({
    credits: 5,
  });
}
