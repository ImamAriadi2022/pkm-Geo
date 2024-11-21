import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";

const ReportForm = ({ onSubmitReport }) => {
  const [report, setReport] = useState({
    name: "",
    description: "",
    photo: null,
    location: "",
    timestamp: "",
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraMode, setCameraMode] = useState("user");

  const videoRef = useRef(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            )
              .then((response) => response.json())
              .then((data) => {
                const { village, town, county, state, country } = data.address;
                setReport((prevReport) => ({
                  ...prevReport,
                  location: `${village || town || ""}, ${county}, ${state}, ${country}`,
                }));
              })
              .catch((error) =>
                console.error("Error fetching location:", error)
              );
          },
          (error) => alert("Gagal mendapatkan lokasi. Periksa izin browser Anda.")
        );
      } else {
        alert("Geolocation tidak didukung oleh browser ini.");
      }
    };

    getLocation();
    setReport((prevReport) => ({
      ...prevReport,
      timestamp: new Date().toLocaleString(),
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
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Tidak dapat mengakses kamera.");
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
  
    const maxWidth = 800;
    const maxHeight = 800;
    let width = video.videoWidth;
    let height = video.videoHeight;
  
    if (width > maxWidth || height > maxHeight) {
      const aspectRatio = width / height;
      if (width > height) {
        width = maxWidth;
        height = maxWidth / aspectRatio;
      } else {
        height = maxHeight;
        width = maxHeight * aspectRatio;
      }
    }
  
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, width, height);
  
    let base64Image = canvas.toDataURL("image/jpeg", 0.7);
  
    while (base64Image.length > 200 * 1024) {
      base64Image = canvas.toDataURL("image/jpeg", 0.5);
    }
  
    console.log("Captured base64 image:", base64Image);
    setReport((prevReport) => ({
      ...prevReport,
      photo: base64Image,
    }));
  
    setIsCameraOpen(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
    setCameraStream(null);
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          const maxWidth = 800;
          const maxHeight = 800;
          let { width, height } = image;

          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxWidth;
              height = maxWidth / aspectRatio;
            } else {
              height = maxHeight;
              width = maxHeight * aspectRatio;
            }
          }

          canvas.width = width;
          canvas.height = height;
          context.drawImage(image, 0, 0, width, height);

          let compressedImage = canvas.toDataURL("image/jpeg", 0.7);

          let quality = 0.7;
          while (compressedImage.length > 100 * 1024 && quality > 0.1) {
            quality -= 0.1;
            compressedImage = canvas.toDataURL("image/jpeg", quality);
          }

          console.log("Compressed image size:", compressedImage.length / 1024, "KB");

          setReport((prevReport) => ({
            ...prevReport,
            photo: compressedImage,
          }));
        };
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!report.name || !report.description || !report.timestamp) {
      alert("Nama pelapor, deskripsi, dan waktu harus diisi.");
      return;
    }

    console.log("Report data before saving:", report);

    const pendingReports = JSON.parse(localStorage.getItem("pendingReports")) || [];
    pendingReports.push(report);
    localStorage.setItem("pendingReports", JSON.stringify(pendingReports));

    console.log("Saved reports to localStorage:", pendingReports);

    alert("Laporan berhasil disimpan!");
    if (onSubmitReport) {
      onSubmitReport(report);
    }
  };

  return (
    <Container className="mt-5">
      <h1>Formulir Laporan</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="reportName">Nama Pelapor</Form.Label>
          <Form.Control
            id="reportName"
            type="text"
            placeholder="Masukkan nama"
            value={report.name}
            onChange={(e) => setReport({ ...report, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="reportDescription">Deskripsi Laporan</Form.Label>
          <Form.Control
            id="reportDescription"
            type="text"
            placeholder="Masukkan deskripsi"
            value={report.description}
            onChange={(e) => setReport({ ...report, description: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="reportLocation">Lokasi Terkini</Form.Label>
          <Form.Control
            id="reportLocation"
            type="text"
            value={report.location}
            readOnly
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="reportPhoto">Unggah Foto</Form.Label>
          <Form.Control id="reportPhoto" type="file" onChange={handleFileUpload} />
          <Button variant="primary" className="mt-2" onClick={openCamera}>
            Gunakan Kamera
          </Button>
        </Form.Group>
        {isCameraOpen && (
          <div className="camera-container mt-3">
            <video id="cameraFeed" ref={videoRef} autoPlay playsInline />
            <Button variant="success" className="mt-2" onClick={captureImage}>
              Ambil Foto
            </Button>
            <Button
              variant="secondary"
              className="mt-2 ms-2"
              onClick={toggleCameraMode}
            >
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
