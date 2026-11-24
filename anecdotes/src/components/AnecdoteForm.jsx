import { useAnecdotesControls } from "../store";

function AnecdoteForm() {
  const { add } = useAnecdotesControls();

  function handleCreate(e) {
    e.preventDefault();
    const blog = e.target.blog.value;
    add(blog);
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
