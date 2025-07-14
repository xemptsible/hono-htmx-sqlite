import { faker } from '@faker-js/faker';
import db from './drizzle.js';
import { todos as todosTable } from './schema/todo.js';

async function main() {
  await db.delete(todosTable);
  console.log('Deleted');

  const user: (typeof todosTable.$inferInsert)[] = [];

  for (let index = 0; index < 3; index++) {
    user.push({
      title: faker.hacker.verb(),
      description: faker.hacker.phrase(),
    });
  }

  await db.insert(todosTable).values(user);
  console.log('New todo created!');

  const todos = await db.select().from(todosTable);
  console.log('Getting all todos from the database: ', todos);
}

main();

