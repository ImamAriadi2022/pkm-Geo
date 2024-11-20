import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

const DashboardPegawai = () => {
  const [approvedReports, setApprovedReports] = useState([]);

  useEffect(() => {
    // Load laporan yang di-approve dari localStorage
    const reports = JSON.parse(localStorage.getItem('approvedReports')) || [];
    setApprovedReports(reports);
  }, []);

  return (
    <Container className="mt-5">
      <h1>Dashboard Pegawai</h1>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Lokasi</th>
            <th>Timestamp</th>
            <th>Foto</th>
            <th>Analisis</th>
          </tr>
        </thead>
        <tbody>
          {approvedReports.map((report, index) => (
            <tr key={index}>
              <td>{report.name}</td>
              <td>{report.description}</td>
              <td>{report.location}</td>
              <td>{report.timestamp}</td>
              <td>
                {report.photo && <img src={`http://localhost:3001${report.photo}`} alt="Report" width="100" />}
              </td>
              <td>{report.analysis}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DashboardPegawai;