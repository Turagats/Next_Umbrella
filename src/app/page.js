"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Table, Modal, Input } from "antd";
import { DeleteOutlined, DoubleRightOutlined } from "@ant-design/icons";
import carModels from "./Dataobjcets";
import { useEffect, useState } from "react";

export default function Home() {
  console.log(carModels);
  const [isvieWing, setIsViewing] = useState(false);
  const [viwingProduct, setViwingProduct] = useState(null);
  const [dataSource, setDataSource] = useState();
  const savedData = [];
  const products = savedData;
  const thisproduct = products.concat(dataSource);

  // const [forimages, setForimages] = useState([
  //   {
  //     id: "8b002a01-f548-4b61-8773-b7d6730d312c",
  //     name: "Oto",
  //     description: "Oto",
  //     price: "Oto",
  //     picture:
  //       "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  //     category: "Oto",
  //     src: "",
  //   },
  //   {
  //     id: 1,
  //     name: "Subaru",
  //     description: "Synovial hypertrophy, NEC, right forearm",
  //     price: 70127,
  //     picture:
  //       "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  //     category: "Landscaping & Irrigation",
  //     src: "",
  //   },
  //   {
  //     id: 2,
  //     name: "GMC",
  //     description: "Food in respiratory tract, part unsp causing asphyxiation",
  //     price: 147443,
  //     picture:
  //       "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  //     category: "RF Shielding",
  //     src: "",
  //   },
  // ]);

  // let theImageURL = [
  //   forimages.map((item) => {
  //     item.picture;
  //   }),
  // ];
  console.log(thisproduct);
  console.log("oto");
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    // {
    //   key: "1",
    //   title: "ID",
    //   dataIndex: "id",
    // },
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
    // {
    //   key: "5",
    //   title: "Picture",
    //   dataIndex: "picture",
    // },
    {
      key: "6",
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Picture",
      dataIndex: "url",
      // render: () => (
      //   <Image src={forimages.map((item) => item.src ?? "")} alt="picture" />
      // ),
      render: (picture) => (
        <img className="w-6 aspect-square" alt={picture} src={picture} />
      ),

      // render: (text, record) => {
      //   return (
      //     <div>
      //       <img src={record.picture} />
      //       {/*<Avatar src={record.productimage}/> */}
      //     </div>
      //   );
      // },
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
    <main className="App p-10 bg-stone-100 h-screen w-full flex flex-col justify-center">
      <header className="App-header bg-white rounded-lg m-10">
        <Link href="/admin" className="w-full flex justify-center mt-10">
          <Button className="">Go to Admin Panel</Button>
        </Link>
        <Table
          className="mt-10 p-10"
          columns={columns}
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
    </main>
  );
}
