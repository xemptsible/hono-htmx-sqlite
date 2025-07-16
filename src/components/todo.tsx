interface TodoProps {
  id: number;
  title: string;
  description: string;
}

export default function Todo({ id, title, description }: TodoProps) {
  const hxVals = JSON.stringify({ title, description });

  return (
    <div id='todo-item'>
      <div class='todo-detail'>
        <h2 id='todo-title'>{title}</h2>
        <p id='todo-description'>{description}</p>
      </div>
      <div class='todo-actions'>
        <button
          class='delete-todo-btn'
          hx-delete={`/api/todo/${id}`}
          hx-target='#todo-item'
          hx-swap='outerHTML'
          hx-confirm='Are you sure you want to delete this todo?'>
          <img
            loading='lazy'
            src='/svg/trash.svg'></img>
          <span class='visually-hidden'>Delete this todo</span>
        </button>
        <button
          hx-post={`/todo/edit/${id}`}
          hx-vals={hxVals}
          hx-target='#todo-list'
          hx-swap='outerHTML'
          class='edit-todo-btn'>
          <img
            loading='lazy'
            src='/svg/edit.svg'
          />
          <span class='visually-hidden'>Edit this todo</span>
        </button>
      </div>
    </div>
  );
}
