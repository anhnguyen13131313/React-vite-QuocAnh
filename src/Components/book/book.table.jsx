import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, Table } from "antd";
import { useEffect, useState } from "react";
import { fetchBookAPI } from "../../services/api.service";
import ViewBookDetail from "./view.book.detail";
import BookForm from "./book.form";
import BookFormUncontrol from "./book.form.uncontrol";
const BookTable = () => {
  const [dataBook, setDataBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  //xem detail book
  const [dataDetailBook, setDataDetailBook] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  useEffect(() => {
    loadBook();
  }, [current, pageSize]);
  const loadBook = async () => {
    const res = await fetchBookAPI(current, pageSize);
    if (res.data && res.data.result) {
      setDataBook(res.data.result);
      setTotal(res.data.meta.total);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
    }
  };
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataDetailBook(record);
              setIsDetailOpen(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (price) => {
        return `${price.toLocaleString()} đ`;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "tác giả",
      dataIndex: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined />
          <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
        </div>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
  };
  return (
    <>
      {/* <BookForm loadBook={loadBook} /> */}
      <BookFormUncontrol loadBook={loadBook} />
      <Table
        columns={columns}
        dataSource={dataBook}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
        }}
        onChange={onChange}
      />
      <ViewBookDetail
        dataDetailBook={dataDetailBook}
        setDataDetailBook={setDataDetailBook}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
    </>
  );
};

export default BookTable;
