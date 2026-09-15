// component = html + css + js
//fragment
import "./style.css";
const MyComponent = () => {
  // const hoidanit = "eric 1";
  // const hoidanit = 25;
  // const hoidanit = true;
  // const hoidanit = undefined;
  // const hoidanit = null;
  const hoidanit = [1, 2, 3];
  // const hoidanit = {
  //   name: "hoidanit",
  //   age: 25,
  // };

  return (
    <>
      <div>{JSON.stringify(hoidanit)} & hoidanit update</div>
      <div>{console.log("eric")}</div>
      <div className="child" style={{ borderRadius: "10px" }}>
        child
      </div>
    </>
  );
};

export default MyComponent;
