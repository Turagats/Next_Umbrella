"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Table, Modal, Input } from "antd";
import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";
import carModels from "./Dataobjcets";
import { useEffect, useState } from "react";

export default function Home() {
  const [isvieWing, setIsViewing] = useState(false);
  const [viwingProduct, setViwingProduct] = useState(null);
  const [dataSource, setDataSource] = useState();
  // const savedData = localStorage.getItem("formData");
  const savedData = [];
  // const products = JSON.parse(savedData);
  const products = savedData;
  const thisproduct = products.concat(dataSource);

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((respone) => respone.json())
          .then((data) => setDataSource(data));

        // const some = JSON.stringify(response);
        // console.log("some");
        // console.log(response.body);
        // console.log("some");
        // window.location.href = "/";
        // Handle the response or perform any necessary actions
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "4",
      title: "Price",
      dataIndex: "price",
    },
    {
      key: "5",
      title: "Picture",
      dataIndex: "picture",
    },
    {
      key: "6",
      title: "Category",
      dataIndex: "category",
    },
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <div className="flex text-slate-600">
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
            <DoubleRightOutlined
              className="ml-2"
              onClick={() => {
                onProductView(record);
              }}
            />
          </div>
        );
      },
    },
  ];

  const onProductView = (record) => {
    setIsViewing(true);
    setViwingProduct({ ...record });
  };
  const onCancelProductView = (record) => {
    setIsViewing(false);
    setViwingProduct(null);
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((prevData) => {
          const filteredData = prevData.filter(
            (product) => product.id !== record.id
          );
          const filteredProducts = products.filter(
            (product) => product.id !== record.id
          );
          localStorage.setItem("formData", JSON.stringify(filteredProducts));
          return filteredData;
        });
      },
    });
  };
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="App p-10 bg-stone-100 h-screen w-full flex flex-col justify-center">
      {/* <div className="App p-10 bg-stone-100 h-screen w-full flex flex-col justify-center"> */}
      <header className="App-header bg-white rounded-lg">
        <Link href="/admin" className="w-full flex justify-center m-10">
          <Button className="">Go to Admin Panel</Button>
        </Link>
        <Table
          className="mt-10 p-10"
          columns={columns}
          // dataSource={thisproduct}
          dataSource={thisproduct}
          rowKey={"id"}
        ></Table>
        <Modal
          title="Edit Student"
          open={isvieWing}
          okText="Ok"
          okButtonProps={{
            style: {
              borderColor: "blue",
              color: "blue",
            },
          }}
          onCancel={() => {
            onCancelProductView();
          }}
          onOk={() => {
            onCancelProductView();
          }}
        >
          <Input className="mb-1" value={viwingProduct?.name} />
          <Input className="mb-1" value={viwingProduct?.description} />
          <Input className="mb-1" value={viwingProduct?.price} />
          <Input className="mb-1" value={viwingProduct?.picture} />
          <Input className="mb-1" value={viwingProduct?.category} />
        </Modal>
      </header>
      {/* </div> */}
    </main>
  );
}
