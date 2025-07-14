import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text().notNull(),
});
