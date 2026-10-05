import {
  Button,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Select,
} from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const { loadBook } = props;
  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setMainText("");
    setAuthor("");
    setPrice(null);
    setQuantity(null);
    setCategory(null);
    setSelectedFile(null);
    setPreview(null);
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

  const handleSubmitBtn = async () => {
    if (!selectedFile) {
      message.error("Vui lòng chọn thumbnail");
      return;
    }
    const resUploadFile = await handleUploadFile(selectedFile, "book");

    if (resUploadFile) {
      const res = await createBookAPI(
        resUploadFile.data.fileUploaded,
        mainText,
        author,
        price,
        quantity,
        category,
      );
      if (res) {
        resetAndCloseModal();
        await loadBook();
        message.success("Tạo mới book thành công");
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
    <div className="book-form" style={{ margin: "10px 0" }}>
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
        closable={false}
        open={isModalOpen}
        onOk={() => {
          handleSubmitBtn();
        }}
        onCancel={() => {
          resetAndCloseModal();
        }}
        maskClosable={false}
        okText={"Create"}
      >
        <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
          <div>
            <span>mainText:</span>
            <Input
              value={mainText}
              onChange={(even) => {
                setMainText(even.target.value);
              }}
            />
          </div>
          <div>
            <span>author:</span>
            <Input
              value={author}
              onChange={(even) => {
                setAuthor(even.target.value);
              }}
            />
          </div>
          <div>
            <span>price:</span>
            <InputNumber
              style={{ width: "100%" }}
              value={price}
              onChange={(value) => {
                setPrice(value);
              }}
            />
          </div>
          <div>
            <span>quantity:</span>
            <InputNumber
              style={{ width: "100%" }}
              value={quantity}
              onChange={(value) => {
                setQuantity(value);
              }}
            />
          </div>
          <div>
            <span>category:</span>
            <Select
              style={{ width: "100%" }}
              value={category}
              onChange={(value) => {
                setCategory(value);
              }}
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
          </div>
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
        </div>
      </Modal>
    </div>
  );
};

export default BookForm;
