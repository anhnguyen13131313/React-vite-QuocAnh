import { Drawer } from "antd";

const ViewBookDetail = (props) => {
  const { dataDetailBook, setDataDetailBook, isDetailOpen, setIsDetailOpen } =
    props;
  return (
    <Drawer
      width={"40vw"}
      title="Chi tiết Book"
      onClose={() => {
        setDataDetailBook(null);

        setIsDetailOpen(false);
      }}
      open={isDetailOpen}
    >
      {dataDetailBook ? (
        <>
          <p>ID: {dataDetailBook._id}</p>
          <br />
          <p>Tiêu đề: {dataDetailBook.mainText}</p>
          <br />
          <p>Tác giả: {dataDetailBook.author}</p>
          <br />
          <p>Thể loại: {dataDetailBook.category}</p>
          <br />
          <p>Giá tiền: {dataDetailBook.price}</p>
          <br />
          <p>Số lượng: {dataDetailBook.quantity}</p>
          <br />
          <p>Đã bán: {dataDetailBook.sold}</p>
          <br />
          <p>Thumbnail: </p>
          <div
            style={{
              marginTop: "10px",
              height: "100px",
              width: "150px",
              border: "1px solid #ccc",
            }}
          >
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetailBook.thumbnail}`}
            />
          </div>
        </>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Drawer>
  );
};

export default ViewBookDetail;
