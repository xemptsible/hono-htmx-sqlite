import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { html } from 'hono/html';
import TodoList from '../components/todo-list.js';
import Todo from '../components/todo.js';
import db from '../db/drizzle.js';
import { todos as todosTable } from '../db/schema/todo.js';

const api = new Hono();

api
  .get('/todo', async (c) => {
    const todos = await db.select().from(todosTable);

    if (todos && todos.length > 0) {
      return c.html(
        todos
          .map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
            />
          ))
          .join('') +
          html` <div
            id="loader"
            class="htmx-indicator">
            loading...
          </div>`
      );
    } else {
      return c.html(<p>There are no todos.</p>);
    }
  })
  .post('/todo/post', async (c) => {
    const newTodo = await c.req.formData();
    const title = newTodo.get('title')?.toString() ?? '';
    const description = newTodo.get('description')?.toString() ?? '';

    const titleLength = title.length;
    const descLength = description.length;

    if (newTodo && title.length > 0 && description.length > 0) {
      const result = await db
        .insert(todosTable)
        .values({
          title,
          description,
        })
        .returning();

      if (result.length > 0) {
        return c.html(<TodoList />);
      }
    }

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
  })
  .delete('/todo/:id', async (c) => {
    const id = c.req.param('id');

    const result = await db
      .delete(todosTable)
      .where(eq(todosTable.id, Number(id)))
      .returning();

    if (result.length > 0) {
      return c.html('', 200);
    }
  })
  .put('/todo/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const updatedTodo = await c.req.formData();
    const title = updatedTodo.get('title')?.toString() ?? '';
    const description = updatedTodo.get('description')?.toString() ?? '';

    const titleLength = title.length;
    const descLength = description.length;

    if (updatedTodo && titleLength > 0 && descLength > 0) {
      const result = await db
        .update(todosTable)
        .set({
          title,
          description,
        })
        .where(eq(todosTable.id, id))
        .returning();

      if (result.length > 0) {
        return c.html(<TodoList />);
      }
    }

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
