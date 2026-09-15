const TodoNew = (props) => {
  const { addNewTodo } = props;

  //   addNewTodo("eric");
  const handleClick = () => {
    alert("click me");
  };

  const handleOnChange = (name) => {
    console.log("handle on change", name);
  };

  return (
    <div className="todo-new">
      <input
        type="text"
        onChange={(even) => {
          handleOnChange(even.target.value);
        }}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default TodoNew;
