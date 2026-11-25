import {
  useAnecdotes,
  useAnecdotesControls,
  useNotificationControls,
} from "../store";

function AnecdoteList() {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdotesControls();
  const { showSuccess } = useNotificationControls();

  function handleClick(anecdote) {
    vote(anecdote.id);
    showSuccess(`You voted "${anecdote.content}"`);
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AnecdoteList;
