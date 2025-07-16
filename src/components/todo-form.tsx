import { html } from 'hono/html';

export default function TodoForm({
  value,
}: {
  value?: { id: string; title: string; description: string };
}) {
  function getMethod(value?: {
    id: string;
    title: string;
    description: string;
  }) {
    return !value ? `hx-post=/api/todo/post` : `hx-put=/api/todo/${value.id}`;
  }

  return html` <form
    ${getMethod(value)}
    hx-target-error="#error-msg">
    <h2>${value ? 'Edit todo' : 'Create new todo'}</h2>
    <label for="title">Title</label>
    <input
      name="title"
      type="text"
      ${value ? `value=${value.title}` : null} />

    <label for="description">Description</label>
    <input
      name="description"
      type="text"
      ${value ? `value=${value.description}` : null} />

    <button type="submit">Submit</button>
    <button
      hx-get="/todo-list"
      hx-target="form"
      hx-swap="outerHTML">
      Cancel
    </button>
    <div id="error-msg"></div>
  </form>`;
}
