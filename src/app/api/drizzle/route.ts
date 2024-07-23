import { db } from "@/app/db";
import { UserTable } from "@/app/db/schema";

export async function GET(req: Request) {
  // await db.insert(UserTable).values({});

  return Response.json({
    massage: "ok",
  });
}
