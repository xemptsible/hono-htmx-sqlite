import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import api from './api/todo.js';
import layoutRenderer from './components/layout.js';
import NewTodo from './components/new-todo.js';
import TodoToolbar from './components/todo-toolbar.js';
import { TodoList } from './components/todo.js';

const HONO_PORT = 3000;

export const app = new Hono();

app.use('*', layoutRenderer);
app.use('*', serveStatic({ root: './static' }));

app.get('/', (c) => {
  return c.render(
    <>
      <TodoToolbar />
      <TodoList />
    </>,
    { title: 'Home' }
  );
});

app.get('/new', (c) => {
  return c.render(<NewTodo />, { title: 'New Todo' });
});

app.route('/api', api);

const server = serve(
  {
    fetch: app.fetch,
    port: HONO_PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

// graceful shutdown
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
