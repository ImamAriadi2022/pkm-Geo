import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

const DashboardPegawai = () => {
  const [approvedReports, setApprovedReports] = useState([]);

  useEffect(() => {
    // Load laporan yang di-approve dari localStorage
    const reports = JSON.parse(localStorage.getItem('approvedReports')) || [];
    setApprovedReports(reports);
  }, []);

  return (
    <Container className="mt-5">
      <h1>Berita Terkini</h1>
      <p>Selamat datang di halaman berita</p>
      <Row>
        {approvedReports.map((report, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              {/* Menambahkan fallback URL jika gambar tidak ditemukan */}
              <Card.Img 
                variant="top" 
                src={report.photo ? `https://pkm-geo.vercel.app/${report.photo}` : "https://via.placeholder.com/150"} 
                alt="Report"
              />
              <Card.Body>
                <Card.Title>{report.name}</Card.Title>
                <Card.Text>
                  <strong>Deskripsi:</strong> {report.description}
                </Card.Text>
                <Card.Text>
                  <strong>Lokasi:</strong> {report.location}
                </Card.Text>
                <Card.Text>
                  <strong>Timestamp:</strong> {report.timestamp}
                </Card.Text>
                <Card.Text>
                  <strong>Analisis:</strong> {report.analysis}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DashboardPegawai;
