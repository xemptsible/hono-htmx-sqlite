import { Hono } from 'hono';
import { Todo, TodoList } from '../components/todo.js';
import db from '../db/drizzle.js';
import { todos as todosTable } from '../db/schema/todo.js';
import { html } from 'hono/html';

const api = new Hono();

api.get('/todo-list', (c) => c.html(<TodoList />));
api
  .get('/todo', async (c) => {
    const todos = await db.select().from(todosTable);

    return c.html(
      todos
        .map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
            description={todo.description}
          />
        ))
        .join('')
    );
  })
  .post('/todo', async (c) => {
    const newTodo = await c.req.parseBody();

    if (
      (newTodo['title'] as string).length > 0 &&
      (newTodo['description'] as string).length > 0
    ) {
      const result = await db
        .insert(todosTable)
        .values({
          title: String(newTodo['title']),
          description: String(newTodo['description']),
        })
        .returning();

      if (result.length > 0) {
        return c.html(<TodoList />);
      }
    }
    const titleLength = (newTodo['title'] as string).length;
    const descLength = (newTodo['description'] as string).length;

    return c.html(
      <p style={{ color: 'red' }}>
        Please write{' '}
        {titleLength === 0 && descLength === 0
          ? 'the title and the description.'
          : titleLength === 0
          ? 'the title.'
          : descLength === 0
          ? 'the description.'
          : ''}
      </p>,
      400
    );
  });

export default api;
