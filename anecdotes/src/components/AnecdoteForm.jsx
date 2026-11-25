import { useAnecdotesControls, useNotificationControls } from "../store";

function AnecdoteForm() {
  const { add } = useAnecdotesControls();
  const { showSuccess } = useNotificationControls();

  function handleCreate(e) {
    e.preventDefault();
    const blog = e.target.blog.value;
    add(blog);
    showSuccess(`add a anecdotes "${blog}"`);
    e.target.reset();
  }
  return (
    <form onSubmit={handleCreate}>
      <div>
        <input name="blog" data-testid="new" />
      </div>
      <button>create</button>
    </form>
  );
}

export default AnecdoteForm;
