interface TodoProps {
  title: string;
  description: string;
}

export function TodoList() {
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

export function Todo({ title, description }: TodoProps) {
  return (
    <div id='todo-item'>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
