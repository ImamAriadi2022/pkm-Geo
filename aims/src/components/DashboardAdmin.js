import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AnalyzeReport from "./AnalyzeReport";

const DashboardAdmin = () => {
  const [pendingReports, setPendingReports] = useState([]);
  const [approvedReports, setApprovedReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load pending and approved reports from localStorage
    const reports = JSON.parse(localStorage.getItem('pendingReports')) || [];
    setPendingReports(reports);

    const approved = JSON.parse(localStorage.getItem('approvedReports')) || [];
    setApprovedReports(approved);
  }, []);

  const handleApprove = async (report) => {
    if (!analysisResult) {
      alert("Lakukan analisis terlebih dahulu sebelum menyetujui laporan.");
      return;
    }

    const analyzedReport = { ...report, analysis: analysisResult };

    // Update approved reports
    const updatedApprovedReports = [...approvedReports, analyzedReport];
    setApprovedReports(updatedApprovedReports);
    localStorage.setItem('approvedReports', JSON.stringify(updatedApprovedReports));

    // Remove from pending reports
    const updatedPendingReports = pendingReports.filter(r => r !== report);
    setPendingReports(updatedPendingReports);
    localStorage.setItem('pendingReports', JSON.stringify(updatedPendingReports));

    alert("Laporan berhasil di-approve!");
    setShowModal(false);
    setSelectedReport(null);
  };

  const handleReject = (report) => {
    const updatedReports = pendingReports.filter(r => r !== report);
    setPendingReports(updatedReports);
    localStorage.setItem('pendingReports', JSON.stringify(updatedReports));
    alert('Laporan ditolak.');
  };

  const handleDeleteApproved = (report) => {
    const updatedApprovedReports = approvedReports.filter(r => r !== report);
    setApprovedReports(updatedApprovedReports);
    localStorage.setItem('approvedReports', JSON.stringify(updatedApprovedReports));
    alert('Laporan berhasil dihapus.');
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
      
      <h2>Laporan Pending</h2>
      <Row>
        {pendingReports.map((report, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={report.photo || "https://via.placeholder.com/150"}
                alt="Report"
              />
              <Card.Body>
                <Card.Title>{report.name}</Card.Title>
                <Card.Text><strong>Deskripsi:</strong> {report.description}</Card.Text>
                <Card.Text><strong>Lokasi:</strong> {report.location}</Card.Text>
                <Card.Text><strong>Timestamp:</strong> {report.timestamp}</Card.Text>
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

      <h2>Laporan yang Di-Approve</h2>
      <Row>
        {approvedReports.map((report, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={report.photo || "https://via.placeholder.com/150"}
                alt="Report"
              />
              <Card.Body>
                <Card.Title>{report.name}</Card.Title>
                <Card.Text><strong>Deskripsi:</strong> {report.description}</Card.Text>
                <Card.Text><strong>Lokasi:</strong> {report.location}</Card.Text>
                <Card.Text><strong>Timestamp:</strong> {report.timestamp}</Card.Text>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteApproved(report)}
                >
                  Hapus
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
          <Button variant="primary" onClick={() => handleApprove(selectedReport)}>
            Approve Report
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DashboardAdmin;
