import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import AnalyzeReport from "./AnalyzeReport";
import reportData from "../data/reports.json";

const DashboardAdmin = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Load laporan dari data JSON
    setReports(reportData);
  }, []);

  const handleAnalyze = (reportId) => {
    const updatedReports = reports.map((report) =>
      report.id === reportId
        ? { ...report, status: "Analyzed", category: "High Risk" } // Simulasi AI
        : report
    );
    setReports(updatedReports);
  };

  return (
    <Container className="mt-5">
      <h1>Admin Dashboard</h1>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Location</th>
            <th>Timestamp</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.description}</td>
              <td>{report.location}</td>
              <td>{report.timestamp}</td>
              <td>{report.category || "Pending"}</td>
              <td>{report.status || "Pending"}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleAnalyze(report.id)}
                >
                  Analyze
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DashboardAdmin;
