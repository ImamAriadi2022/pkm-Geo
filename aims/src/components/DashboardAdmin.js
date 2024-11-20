import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
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

  const handleApprove = (report) => {
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

    alert('Laporan berhasil disetujui!');
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
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Lokasi</th>
            <th>Timestamp</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pendingReports.map((report, index) => (
            <tr key={index}>
              <td>{report.name}</td>
              <td>{report.description}</td>
              <td>{report.location}</td>
              <td>{report.timestamp}</td>
              <td>
                <Button variant="info" onClick={() => handleAnalyze(report)}>
                  Analyze
                </Button>
                <Button variant="success" className="ms-2" onClick={() => handleApprove(report)}>
                  Approve
                </Button>
                <Button variant="danger" className="ms-2" onClick={() => handleReject(report)}>
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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