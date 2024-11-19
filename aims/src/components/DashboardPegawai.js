import React from "react";
import { Container, Card, Button } from "react-bootstrap";

const DashboardPegawai = () => {
  return (
    <Container className="mt-5">
      <h1>Welcome, Pegawai</h1>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Recent News</Card.Title>
          <Card.Text>Check out the latest updates and announcements.</Card.Text>
          <Button href="/news" variant="primary">
            View News
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DashboardPegawai;
