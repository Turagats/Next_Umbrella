"use client";
import React from "react";
import { Button, Table, Modal, Input, Form } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export default function Admin() {
  const [id, setId] = useState(uuidv4());
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    description: "",
    price: "",
    picture: "",
    category: "",
  });
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   // console.log(products);
  //   localStorage.setItem("formData", JSON.stringify(products));
  // }, [products]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name);
  };
  const CancelHandler = () => {
    window.location.href = "/";
  };
  // const SaveHandler = () => {
  //   // setId(uuidv4());

  //   setProducts([...products, formData]);
  //   console.log(products);
  //   setFormData({
  //     id: uuidv4(),
  //     name: "",
  //     description: "",
  //     price: "",
  //     picture: "",
  //     category: "",
  //   });
  //   // window.location.href = "/";
  // };
  // // console.log(products);/

  const handleSubmit = async (event) => {
    // event.preventDefault();

    // const formData = { name, price, description };
    setId(uuidv4());
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("formData");
      window.location.href = "/";
      // Handle the response or perform any necessary actions
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* <div className="flex flex-col gap-5 w-1/4"> */}
      <Form onFinish={handleSubmit}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
          name={"name"}
          label={"Name"}
        >
          <Input
            className="mb-1"
            name="name"
            value={formData.name}
            placeholder="name"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Description is required",
            },
          ]}
          name={"description"}
          label={"Description"}
        >
          <Input
            className="mb-1"
            name="description"
            value={formData.description}
            placeholder="description"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Price is required",
            },
          ]}
          name={"price"}
          label={"Price"}
        >
          <Input
            className="mb-1"
            name="price"
            value={formData.price}
            placeholder="price"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Picture is required",
            },
          ]}
          name={"picture"}
          label={"Picture"}
        >
          <Input
            className="mb-1"
            name="picture"
            value={formData.picture}
            placeholder="picture"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Category is required",
            },
          ]}
          name={"category"}
          label={"Category"}
        >
          <Input
            className="mb-1"
            name="category"
            value={formData.category}
            placeholder="category"
            onChange={handleChange}
          />
        </Form.Item>

        <div className="flex gap-5 justify-center">
          <Button onClick={CancelHandler}>Cancel</Button>
          <Button htmlType="sumbit" type="primary">
            Save
          </Button>
        </div>
      </Form>
      {/* </div> */}
    </div>
  );
}
