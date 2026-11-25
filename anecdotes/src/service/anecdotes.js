const baseUrl = "http://localhost:3001/anecdotes";

async function getAll() {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }
  return await response.json();
}

async function create(content) {
  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };
  const response = await fetch(baseUrl, option);
  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }
  return await response.json();
}

async function vote(id, anecdote) {
  const option = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(anecdote),
  };
  const response = await fetch(`${baseUrl}/${id}`, option);
  if (!response.ok) {
    throw new Error("Failed to vote anecdote");
  }
  return await response.json();
}

async function deleteAnecdote(id) {}

export default { getAll, create, vote };
