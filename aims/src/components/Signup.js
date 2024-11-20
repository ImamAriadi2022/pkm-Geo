import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    // Simulasi pendaftaran berhasil
    console.log("Email:", email);
    console.log("Password:", password);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/login");
    }, 3000);
  };

  return (
    <Container className="mt-5">
      <h1>Sign Up</h1>
      {showSuccess && <Alert variant="success">Pendaftaran berhasil! Anda akan diarahkan ke halaman login.</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Masukkan email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Daftar
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;