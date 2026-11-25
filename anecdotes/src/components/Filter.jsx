import { useAnecdotesControls } from "../store";

function Filter() {
  const { filter } = useAnecdotesControls();

  function handleChange(e) {
    // the value of the input field is in event.target.value
    filter(e.target.value);
  }
  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      <label>
        filter: <input onChange={handleChange} data-testid="filter" />
      </label>
    </div>
  );
}

export default Filter;
