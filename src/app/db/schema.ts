import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
  userId: text("user_id").primaryKey(),
  credits: integer("credits"),
});
