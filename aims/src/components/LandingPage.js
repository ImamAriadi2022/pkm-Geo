import React from "react";
import { Container, Card, Row, Col, Button, Image } from "react-bootstrap";
import backgroundImage from "../assets/background.jpg"; // Ganti dengan path gambar yang sesuai
import aimsImage from "../assets/aims.jpg"; // Ganti dengan path gambar yang sesuai
import aiImage from "../assets/ai.jpg"; // Ganti dengan path gambar yang sesuai
import placeholderImage from "../assets/placeholder.jpg"; // Gambar placeholder

const LandingPage = () => {
  const handleImageError = (e) => {
    e.target.src = placeholderImage;
  };

  return (
    <>
      <Container fluid className="p-0">
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "400px",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="display-3">Welcome to the AIMS System</h1>
        </div>
      </Container>

      <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Latar Belakang</Card.Title>
                <Card.Text>
                  Sektor industri minyak dan gas (migas) di Indonesia memiliki peran penting dalam memenuhi kebutuhan energi nasional. Pertamina, sebagai salah satu Badan Usaha Milik Negara (BUMN), bertanggung jawab dalam pengelolaan sumber daya migas di Indonesia. Namun, di balik peran besarnya, Pertamina menghadapi tantangan signifikan terkait keselamatan operasional. Oleh karena itu, sistem perlindungan menjadi elemen krusial dalam menekan risiko insiden kecelakaan.
                </Card.Text>
                <Button variant="primary" href="#learn-more">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Image src={aimsImage} fluid onError={handleImageError} />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Image src={aiImage} fluid onError={handleImageError} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Cara Kerja Sistem</Card.Title>
                <Card.Text>
                  Asset Integrity Management System (AIMS) adalah sebuah sistem yang dirancang untuk memastikan infrastruktur, peralatan, dan fasilitas kritis di industri migas dapat beroperasi dengan aman dan andal sepanjang siklus hidupnya. Sistem ini menggunakan teknologi pemeliharaan prediktif dengan kecerdasan buatan (AI) serta berbasis web untuk mengelola aset dan meningkatkan efisiensi operasional.
                </Card.Text>
                <Button variant="primary" href="#how-it-works">How It Works</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Manfaat Sistem</Card.Title>
                <Card.Text>
                  Teknologi digital seperti sistem peringatan dini berbasis AI memungkinkan identifikasi dini terhadap potensi kegagalan, memberikan waktu yang cukup untuk melakukan tindakan korektif sebelum masalah menjadi lebih serius. Hal ini sangat penting dalam menjaga keselamatan operasi dan keandalan aset.
                </Card.Text>
                <Button variant="primary" href="#benefits">Benefits</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Image src={backgroundImage} fluid onError={handleImageError} />
          </Col>
        </Row>

        <Row className="text-center mt-5">
          <Col>
            <h2 id="learn-more">Learn More</h2>
            <p>
              Untuk informasi lebih lanjut tentang bagaimana sistem AIMS dapat membantu perusahaan Anda, silakan hubungi kami atau kunjungi halaman dokumentasi kami.
            </p>
            <Button variant="primary" href="/contact">Contact Us</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LandingPage;