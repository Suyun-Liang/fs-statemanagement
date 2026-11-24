import { useAnecdotes, useAnecdotesControls } from "../store";

function AnecdoteList() {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdotesControls();

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AnecdoteList;
