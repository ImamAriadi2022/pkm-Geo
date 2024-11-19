import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const InputForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    risk: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data: ", formData);
    alert("Data has been submitted (simulation).");
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Input Asset Data</h1>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Asset Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter asset name"
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter status"
            name="status"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Risk Level</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter risk level"
            name="risk"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default InputForm;
