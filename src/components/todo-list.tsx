import type { ReactNode } from 'hono/jsx';

export default function TodoList({ children }: { children?: ReactNode }) {
  return (
    <div
      id='todo-list'
      hx-get='/api/todo'
      hx-indicator='#loader'
      hx-trigger='load'>
      <div
        id='loader'
        class='htmx-indicator'>
        loading...
      </div>
    </div>
  );
}
