import { useEffect, useState } from "react";
import { Input, notification, Modal } from "antd";
import { createUserAPI, updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } =
    props;

  useEffect(() => {
    console.log(">>> check data Update props", dataUpdate);
    if (dataUpdate) {
      setId(dataUpdate._id);
      setFullName(dataUpdate.fullName);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);
  const handleSubmitBtn = async () => {
    const res = await updateUserAPI(id, fullName, phone);
    if (res.data) {
      notification.success({
        message: "Update user",
        description: "cập nhật thành công",
      });
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Error create user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setFullName("");
    setPhone("");
    setId("");
    setDataUpdate(null);
  };

  return (
    <Modal
      title="Update a User"
      closable={false}
      open={isModalUpdateOpen}
      onOk={() => {
        handleSubmitBtn();
      }}
      onCancel={() => {
        resetAndCloseModal();
      }}
      maskClosable={false}
      okText={"SAVE"}
    >
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>Id</span>
          <Input value={id} disabled />
        </div>
        <div>
          <span>FullName</span>
          <Input
            value={fullName}
            onChange={(even) => {
              setFullName(even.target.value);
            }}
          />
        </div>
        <div>
          <span>PhoneNumber</span>
          <Input
            value={phone}
            onChange={(even) => {
              setPhone(even.target.value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
export default UpdateUserModal;
