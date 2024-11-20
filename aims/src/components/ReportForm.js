import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const ReportForm = ({ onSubmitReport }) => {
  const [report, setReport] = useState({
    name: '',
    description: '',
    photo: null,
    location: '',
    timestamp: ''
  });
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraMode, setCameraMode] = useState('user');

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
              const { village, town, county, state, country } = data.address;
              setReport((prevReport) => ({
                ...prevReport,
                location: `${village || town || ''}, ${county}, ${state}, ${country}`
              }));
            })
            .catch((error) => console.error('Error fetching location:', error));
        });
      } else {
        alert("Geolocation tidak didukung oleh browser ini.");
      }
    };

    getLocation();
    setReport((prevReport) => ({
      ...prevReport,
      timestamp: new Date().toLocaleString()
    }));
  }, []);

  const openCamera = async () => {
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraMode },
      });

      setCameraStream(stream);
      setIsCameraOpen(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Tidak dapat mengakses kamera.");
    }
  };

  const captureImage = () => {
    const video = document.getElementById("cameraFeed");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setReport((prevReport) => ({
        ...prevReport,
        photo: blob
      }));
      setIsCameraOpen(false);
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    });
  };

  const toggleCameraMode = async () => {
    setCameraMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
    if (isCameraOpen) {
      openCamera();
    }
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!report.name || !report.description || !report.timestamp) {
      alert("Nama pelapor, judul laporan, dan waktu harus diisi.");
      return;
    }

    // Simpan laporan sementara di localStorage
    const pendingReports = JSON.parse(localStorage.getItem('pendingReports')) || [];
    pendingReports.push(report);
    localStorage.setItem('pendingReports', JSON.stringify(pendingReports));

    alert('Laporan berhasil disimpan dan menunggu persetujuan admin!');
    if (onSubmitReport) {
      onSubmitReport(report);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Formulir Laporan</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nama Pelapor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nama"
            name="name"
            value={report.name}
            onChange={(e) => setReport({ ...report, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Deskripsi Laporan</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan deskripsi"
            name="description"
            value={report.description}
            onChange={(e) => setReport({ ...report, description: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Lokasi Terkini</Form.Label>
          <Form.Control
            type="text"
            placeholder="Lokasi"
            name="location"
            value={report.location}
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Unggah Foto</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setReport({ ...report, photo: e.target.files[0] })}
          />
          <Button variant="primary" className="mt-2" onClick={openCamera}>
            Gunakan Kamera
          </Button>
        </Form.Group>
        {isCameraOpen && (
          <div className="camera-container mt-3">
            <video
              id="cameraFeed"
              autoPlay
              playsInline
              ref={(video) => {
                if (video && cameraStream) {
                  video.srcObject = cameraStream;
                }
              }}
            />
            <Button variant="success" className="mt-2" onClick={captureImage}>
              Ambil Foto
            </Button>
            <Button variant="secondary" className="mt-2 ms-2" onClick={toggleCameraMode}>
              Ubah Kamera
            </Button>
            <Button variant="danger" className="mt-2 ms-2" onClick={closeCamera}>
              Tutup Kamera
            </Button>
          </div>
        )}
        <Button variant="primary" type="submit">
          Kirim Laporan
        </Button>
      </Form>
    </Container>
  );
};

export default ReportForm;