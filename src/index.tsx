import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import api from './api/todo.js';
import layoutRenderer from './components/layout.js';
import TodoForm from './components/todo-form.js';
import TodoList from './components/todo-list.js';
import TodoToolbar from './components/todo-toolbar.js';

const HONO_PORT = 3000;

const app = new Hono();

app.use('*', layoutRenderer);
app.use('*', serveStatic({ root: './static' }));

app
  .get('/', (c) => {
    return c.render(
      <>
        <TodoToolbar />
        <TodoList />
      </>,
      { title: 'Home' }
    );
  })
  .get('/todo-list', (c) => c.html(<TodoList />))
  .get('/new', (c) => {
    return c.render(<TodoForm />, { title: 'New Todo' });
  })
  .post('/todo/edit/:id', async (c) => {
    const id = c.req.param('id');
    const { title, description } = await c.req.parseBody();

    const value = {
      id,
      title: String(title),
      description: String(description),
    };

    return c.render(<TodoForm value={value} />, { title: 'Update Todo' });
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
