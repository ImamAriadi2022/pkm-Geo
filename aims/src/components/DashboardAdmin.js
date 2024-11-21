import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Row, Col } from "react-bootstrap";
import AnalyzeReport from "./AnalyzeReport";

const DashboardAdmin = () => {
  const [pendingReports, setPendingReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');

  useEffect(() => {
    // Load laporan yang belum di-approve dari localStorage
    const reports = JSON.parse(localStorage.getItem('pendingReports')) || [];
    setPendingReports(reports);
  }, []);

  const handleApprove = async (report) => {
    // Tambahkan hasil analisis ke laporan
    const analyzedReport = { ...report, analysis: analysisResult };

    // Simpan laporan yang di-approve di localStorage
    const approvedReports = JSON.parse(localStorage.getItem('approvedReports')) || [];
    approvedReports.push(analyzedReport);
    localStorage.setItem('approvedReports', JSON.stringify(approvedReports));

    // Hapus laporan dari pendingReports
    const updatedReports = pendingReports.filter(r => r !== report);
    setPendingReports(updatedReports);
    localStorage.setItem('pendingReports', JSON.stringify(updatedReports));

    // Upload laporan ke API
    const formData = new FormData();
    formData.append('name', analyzedReport.name);
    formData.append('description', analyzedReport.description);
    formData.append('location', analyzedReport.location);
    formData.append('timestamp', analyzedReport.timestamp);
    formData.append('analysis', analyzedReport.analysis);
    if (analyzedReport.photo) {
      formData.append('photo', analyzedReport.photo);
    }

    try {
      const response = await fetch('https://back-fix-laps.vercel.app/api/aims-upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      alert('Laporan berhasil diunggah ke API!');
    } catch (error) {
      console.error('Error uploading report:', error);
      alert('Terjadi kesalahan saat mengunggah laporan ke API.');
    }

    setShowModal(false);
    setSelectedReport(null);
  };

  const handleReject = (report) => {
    // Hapus laporan dari pendingReports
    const updatedReports = pendingReports.filter(r => r !== report);
    setPendingReports(updatedReports);
    localStorage.setItem('pendingReports', JSON.stringify(updatedReports));
    alert('Laporan ditolak.');
  };

  const handleAnalyze = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  const handleAnalysisResult = (result) => {
    setAnalysisResult(result);
  };

  return (
    <Container className="mt-5">
      <h1>Admin Dashboard</h1>
      <Row>
        {pendingReports.map((report, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`http://localhost:3001${report.photo}`} alt="Report" />
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
                <Button variant="info" onClick={() => handleAnalyze(report)}>
                  Analyze
                </Button>
                <Button variant="success" className="ms-2" onClick={() => handleApprove(report)}>
                  Approve
                </Button>
                <Button variant="danger" className="ms-2" onClick={() => handleReject(report)}>
                  Reject
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Report Analysis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && <AnalyzeReport report={selectedReport} onAnalysisResult={handleAnalysisResult} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DashboardAdmin;