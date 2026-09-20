import UserForm from "../Components/user/user.form";
import UserTable from "../Components/user/user.table";

const UserPage = () => {
  return (
    <div style={{padding: "20px"}}>
        <UserForm/>
        <UserTable />
    </div>
  );
};

export default UserPage;
