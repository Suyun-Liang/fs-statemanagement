import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import { useAnecdotesControls } from "./store";
import Notification from "./components/Notification";

const App = () => {
  const { initial } = useAnecdotesControls();

  useEffect(() => {
    initial();
  }, [initial]);

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
