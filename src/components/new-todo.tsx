export default function NewTodo() {
  return (
    <form
      hx-post='/api/todo'
      hx-include="[name='title'], [name='description']"
      hx-target-error='#error-msg'>
      <h2>Create new todo</h2>
      <label for='title'>Title</label>
      <input
        name='title'
        type={'text'}></input>

      <label for='description'>Description</label>
      <input
        name='description'
        type={'text'}></input>

      <button type='submit'>Submit</button>
      <button
        hx-get='api/todo-list'
        hx-target='form'
        hx-swap='outerHTML'>
        Cancel
      </button>
      <div id='error-msg'></div>
    </form>
  );
}
