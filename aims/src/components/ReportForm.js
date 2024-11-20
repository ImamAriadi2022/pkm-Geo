import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!report.name || !report.description || !report.timestamp) {
      alert("Nama pelapor, judul laporan, dan waktu harus diisi.");
      return;
    }

    const formData = new FormData();
    formData.append('description', report.description);
    formData.append('pegawaiName', report.name);
    formData.append('fotoLaporan', report.photo);
    formData.append('pegawaiDate', report.timestamp);
    formData.append('location', report.location);

    try {
      const response = await fetch('https://back-fix-laps.vercel.app/api/upload-and-save', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Laporan berhasil dikirim!');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Gagal mengirim laporan: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengirim laporan.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nama Pelapor</Form.Label>
          <Form.Control
            type="text"
            value={report.name}
            onChange={(e) => setReport({ ...report, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Judul Laporan</Form.Label>
          <Form.Control
            type="text"
            value={report.description}
            onChange={(e) => setReport({ ...report, description: e.target.value })}
            required
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
          Submit Report
        </Button>
      </Form>
    </Container>
  );
};

export default ReportForm;