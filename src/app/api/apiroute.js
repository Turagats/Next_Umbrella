export default function handler(req, res) {
  if (req.method === "POST") {
    const formData = req.body;

    console.log(formData);
    res.status(200).json({ message: "Form submitted successfully" });
  } else {
    res.status(405).json({ message: "Method Not Allowed egaaa" });
    console.log(message);
  }
}

{
  /* <Form onFinish={handleSubmit}>
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
      </Form> */
}
