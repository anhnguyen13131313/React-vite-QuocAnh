import { useState } from "react";

const TodoNew = (props) => {
  //useState hook
  // const valueInput = "eric";
  const [valueInput, setValueInput] = useState("eric");

  const { addNewTodo } = props;

  //   addNewTodo("eric");
  const handleClick = () => {
    addNewTodo(valueInput);
    setValueInput("");
  };

  const handleOnChange = (name) => {
    setValueInput(name);
  };

  return (
    <div className="todo-new">
      <input
        type="text"
        onChange={(even) => {
          handleOnChange(even.target.value);
        }}
        value={valueInput}
      />
      <button onClick={handleClick}>Add</button>
      <div>My text input is = {valueInput}</div>
    </div>
  );
};

export default TodoNew;
