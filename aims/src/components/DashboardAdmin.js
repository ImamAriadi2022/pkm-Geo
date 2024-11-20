import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import supabase from './supabaseClient'; // Pastikan path ini sesuai dengan lokasi file supabaseClient.js

const DashboardAdmin = () => {
  const [pendingReports, setPendingReports] = useState([]);

  useEffect(() => {
    // Load laporan yang belum di-approve dari localStorage
    const reports = JSON.parse(localStorage.getItem('pendingReports')) || [];
    setPendingReports(reports);
  }, []);

  const handleApprove = async (report) => {
    const { error } = await supabase
      .from('reports')
      .insert([report]);

    if (error) {
      console.error('Error inserting report:', error);
      alert('Terjadi kesalahan saat mengirim laporan.');
    } else {
      alert('Laporan berhasil dikirim ke Supabase!');
      // Hapus laporan dari pendingReports
      const updatedReports = pendingReports.filter(r => r !== report);
      setPendingReports(updatedReports);
      localStorage.setItem('pendingReports', JSON.stringify(updatedReports));
    }
  };

  const handleReject = (report) => {
    // Hapus laporan dari pendingReports
    const updatedReports = pendingReports.filter(r => r !== report);
    setPendingReports(updatedReports);
    localStorage.setItem('pendingReports', JSON.stringify(updatedReports));
    alert('Laporan ditolak.');
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
                <Button variant="success" onClick={() => handleApprove(report)}>
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
    </Container>
  );
};

export default DashboardAdmin;