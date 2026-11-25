import { create } from "zustand";
import anecdoteService from "./service/anecdotes";
import { useShallow } from "zustand/shallow";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);
      const updatedAnecdote = await anecdoteService.vote(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes
          .map((note) => (note.id === id ? updatedAnecdote : note))
          .toSorted((a, b) => b.votes - a.votes),
      }));
    },
    add: async (content) => {
      const newAnecdotes = await anecdoteService.create(content);
      set((state) => ({
        anecdotes: [...state.anecdotes, newAnecdotes],
      }));
    },
    filter: (input) => set(() => ({ filter: input.toLowerCase().trim() })),
    initial: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
  },
}));

const useNotificationStore = create((set, get) => ({
  notification: null,
  actions: {
    showSuccess: (message) =>
      set(() => ({ notification: { message, type: "success" } })),
    showError: (message) =>
      set(() => ({ notification: { message, type: "error" } })),
    clearNotification: () => set({ notification: null }),
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  const filterAnecdotes = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter),
  );
  return filterAnecdotes;
};
export const useAnecdotesControls = () =>
  useAnecdoteStore((state) => state.actions);

export const useNotification = () =>
  useNotificationStore((state) => state.notification);
export const useNotificationControls = () =>
  useNotificationStore((state) => state.actions);
