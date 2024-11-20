import React from "react";
import { Container, Card } from "react-bootstrap";

const LandingPage = () => {
  return (
    <>
      <Container className="mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Welcome to the AIMS System</Card.Title>
            <Card.Text>
              This is a website for managing asset integrity in the oil and gas
              industry.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LandingPage;