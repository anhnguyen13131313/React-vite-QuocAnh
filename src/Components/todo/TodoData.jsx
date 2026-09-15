const TodoData = (props) => {
  //props la mot bien object{}
  // {
  //     name: "eric",
  //     age: 25,
  //     data;{}
  // }
  const { name, age, data } = props;
  //   const name = props.name;
  //   const age = props.age;
  //   const data = props.data;

  //   console.log(props);
  return (
    <div className="todo-data">
      <div>My name is: {name}</div>
      <div>Learning React</div>
      <div>Watching Youtube</div>
      <div>{JSON.stringify(props.todoList)}</div>
    </div>
  );
};

export default TodoData;
