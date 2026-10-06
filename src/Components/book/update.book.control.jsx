import { InputNumber, message, Modal, Select } from "antd";
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookControl = (props) => {
  const { dataUpdate, setDataUpdate, isUpdateOpen, setIsUpdateOpen, loadBook } =
    props;

  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (dataUpdate) {
      setId(dataUpdate._id);
      setMainText(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`,
      );
    }
  }, [dataUpdate]);

  const resetAndCloseModal = () => {
    setIsUpdateOpen(false);
    setMainText("");
    setAuthor("");
    setId("");
    setPrice(null);
    setQuantity(null);
    setCategory(null);
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
  const handleSubmitBtn = async () => {
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
      id,
      thumbnail,
      mainText,
      author,
      price,
      quantity,
      category,
    );

    if (res) {
      resetAndCloseModal();
      await loadBook();
      message.success("cập nhật book thành công");
    } else {
      message.error("Lỗi cập nhật book");
    }
  };
  return (
    <Modal
      title="Update Book"
      closable={false}
      open={isUpdateOpen}
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
          <span>Tiêu Đề</span>
          <Input
            value={mainText}
            onChange={(even) => {
              setMainText(even.target.value);
            }}
          />
        </div>
        <div>
          <span>Tác Giả</span>
          <Input
            value={author}
            onChange={(even) => {
              setAuthor(even.target.value);
            }}
          />
        </div>
        <div>
          <span>Giá tiền</span>
          <InputNumber
            style={{ width: "100%" }}
            value={price}
            onChange={(even) => {
              setPrice(even);
            }}
          />
        </div>
        <div>
          <span>Số lượng</span>
          <InputNumber
            style={{ width: "100%" }}
            value={quantity}
            onChange={(even) => {
              setQuantity(even);
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
            htmlFor="btnUploadUpdate"
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
            Edit thumbnail
          </label>
          <input
            type="file"
            hidden
            id="btnUploadUpdate"
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
  );
};

export default UpdateBookControl;
