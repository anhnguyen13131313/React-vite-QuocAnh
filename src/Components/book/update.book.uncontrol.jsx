import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookUncontrol = (props) => {
  const { dataUpdate, setDataUpdate, isUpdateOpen, setIsUpdateOpen, loadBook } =
    props;
  const [form] = Form.useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!dataUpdate) return;

    form.setFieldsValue({
      id: dataUpdate._id,
      mainText: dataUpdate.mainText,
      author: dataUpdate.author,
      price: dataUpdate.price,
      quantity: dataUpdate.quantity,
      category: dataUpdate.category,
    });
    setPreview(
      `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`,
    );
  }, [dataUpdate]);
  const resetAndCloseModal = () => {
    setIsUpdateOpen(false);
    form.resetFields();
    setSelectedFile(null);
    setPreview(null);
    setDataUpdate(null);
  };
  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmitBtn = async (value) => {
    let thumbnail = "";
    if (!preview && !selectedFile) {
      message.error("Vui lòng thêm ảnh");
      return;
    }
    if (!selectedFile) {
      thumbnail = dataUpdate.thumbnail;
    }
    if (selectedFile) {
      const resUploadFile = await handleUploadFile(selectedFile, "book");
      thumbnail = resUploadFile.data.fileUploaded;
    }

    const res = await updateBookAPI(
      value.id,
      thumbnail,
      value.mainText,
      value.author,
      value.price,
      value.quantity,
      value.category,
    );

    if (res) {
      resetAndCloseModal();
      await loadBook();
      message.success("cập nhật book thành công");
    } else {
      message.error("LỖI cập nhật book thất bại");
    }
  };
  return (
    <Modal
      title="Update Book"
      closable={false}
      open={isUpdateOpen}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        resetAndCloseModal();
      }}
      maskClosable={false}
      okText={"SAVE"}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          handleSubmitBtn(values);
        }}
      >
        <Form.Item label="ID" name="id" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Tiêu đề"
          name="mainText"
          rules={[{ required: true, message: "Please input your main text!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tác Giả"
          name="author"
          rules={[{ required: true, message: "Please input author!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá Tiền"
          name="price"
          rules={[{ required: true, message: "Please input price!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Please input quantity!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Thể loại"
          name="category"
          rules={[{ required: true, message: "Please input category!" }]}
        >
          <Select
            placeholder="Chọn thể loại"
            options={[
              { value: "Arts", label: "Arts" },
              { value: "Business", label: "Business" },
              { value: "Comics", label: "Comics" },
              { value: "Cooking", label: "Cooking" },
              { value: "Entertainment", label: "Entertainment" },
              { value: "History", label: "History" },
              { value: "Music", label: "Music" },
              { value: "Sports", label: "Sports" },
              { value: "Teen", label: "Teen" },
              { value: "Travel", label: "Travel" },
            ]}
          />
        </Form.Item>
        <div>
          <label
            htmlFor="btnUpload"
            style={{
              display: "block",
              width: "fit-content",
              marginTop: "15px",
              padding: "5px 10px",
              background: "orange",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload Thumbnail
          </label>
          <input
            type="file"
            hidden
            id="btnUpload"
            onChange={(even) => handleOnChangeFile(even)}
            onClick={(even) => (even.target.value = null)}
            style={{ display: "none" }}
          />
        </div>
        {preview && (
          <>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "15px",
                height: "100px",
                width: "150px",
              }}
            >
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
                src={preview}
              />
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default UpdateBookUncontrol;
