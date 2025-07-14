export default function TodoToolbar() {
  return (
    <>
      <button
        hx-get='/api/todo'
        hx-target='#todo-list'>
        Get todo
      </button>
      <button
        hx-get='/new'
        hx-target='#todo-list'
        hx-swap='outerHTML'>
        New todo
      </button>
    </>
  );
}
