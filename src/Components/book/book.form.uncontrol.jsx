import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const BookFormUncontrol = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { loadBook } = props;

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
  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedFile(null);

    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };
  const handleSubmitBtn = async (values) => {
    if (!selectedFile) {
      message.error("Vui lòng chọn thumbnail");
      return;
    }
    const resUploadFile = await handleUploadFile(selectedFile, "book");

    if (resUploadFile) {
      const res = await createBookAPI(
        resUploadFile.data.fileUploaded,
        values.mainText,
        values.author,
        values.price,
        values.quantity,
        values.category,
      );
      if (res) {
        message.success("Tạo mới book thành công");
        resetAndCloseModal();
        await loadBook();

        //   } else {
        //     notification.error({
        //       message: "Lỗi tạo mới book",
        //       description: JSON.stringify(res.message),
        //     });
        //   }
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Books</h3>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Create Book
        </Button>
      </div>
      <Modal
        title="Create Book"
        open={isModalOpen}
        onCancel={resetAndCloseModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            handleSubmitBtn(values);
          }}
        >
          <Form.Item
            label="Tiêu đề"
            name="mainText"
            rules={[
              { required: true, message: "Please input your main text!" },
            ]}
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
          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => {
                  form.submit();
                }}
                type="primary"
              >
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default BookFormUncontrol;
