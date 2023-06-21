"use client";
import React from "react";
import { Button, Table, Modal, Input, Form, Upload } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { UpCircleFilled } from "@ant-design/icons";

export default function Admin() {
  const [id, setId] = useState(uuidv4());
  const [uploadedImage, setUploadedImage] = useState(null);

  const [formData, setFormData] = useState({
    id: id,
    name: "",
    description: "",
    price: "",
    picture: uploadedImage,
    category: "",
    url: uploadedImage,
  });

  const handleImageUpload = (file) => {
    // Perform any additional validations or modifications if needed
    setUploadedImage(file);
  };
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

  const handleSubmit = async (event) => {
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
      // window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
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
          {/* <Input
            className="mb-1"
            name="picture"
            value={formData.picture}
            placeholder="picture"
            onChange={handleChange}
          /> */}
          <Upload
            action={"http://localhost:3000/api/products"}
            name="picture"
            // value={formData.picture}
            // fileList={formData.picture}
            defaultFileList={formData.picture}
            listType="picture"
            beforeUpload={handleImageUpload}
            fileList={uploadedImage ? [uploadedImage] : []}
            accept="image/*"
            multiple={false}
          >
            <Button>Upload Photo</Button>
          </Upload>
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
        <Form.Item></Form.Item>

        <div className="flex gap-5 justify-center">
          <Button onClick={CancelHandler}>Cancel</Button>
          <Button htmlType="sumbit" type="primary">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
