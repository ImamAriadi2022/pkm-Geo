import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const ReportForm = ({ onSubmitReport }) => {
  const [report, setReport] = useState({
    description: "",
    location: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }
    setReport({ ...report, photo: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();

    if (onSubmitReport) {
      onSubmitReport({ ...report, timestamp });
    } else {
      console.error("onSubmitReport function is not defined!");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Report Issue</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={report.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={report.location}
            onChange={handleInputChange}
            placeholder="Enter location manually"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Photo (Optional)</Form.Label>
          <Form.Control type="file" name="photo" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Report
        </Button>
      </Form>
    </Container>
  );
};

export default ReportForm;
