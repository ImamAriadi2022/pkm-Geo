const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Folder untuk menyimpan foto
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Konfigurasi Multer untuk upload file
const upload = multer({ dest: uploadFolder });

// Fungsi utilitas untuk membaca dan menulis JSON
const readReports = () => {
    const data = fs.readFileSync('./reports.json', 'utf8');
    return JSON.parse(data);
};

const writeReports = (data) => {
    fs.writeFileSync('./reports.json', JSON.stringify(data, null, 2));
};

// Landing Page
app.get('/', (req, res) => {
    res.render('landing');
});

// Login Page
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
        res.redirect('/admin');
    } else if (username === 'user' && password === 'user') {
        res.redirect('/dashboard');
    } else {
        res.render('login', { error: 'Invalid credentials' });
    }
});

// Dashboard untuk Pegawai/Pelapor
app.get('/dashboard', (req, res) => {
    const reports = readReports().filter((report) => report.status === 'completed');
    res.render('dashboard', { reports });
});

// Form Laporan
app.get('/report', (req, res) => {
    res.render('report');
});

// Kirim Laporan
app.post('/report', upload.single('photo'), (req, res) => {
    const { description, location } = req.body;

    const newReport = {
        id: Date.now(),
        description,
        location: location || 'Lokasi tidak diketahui',
        photo: req.file ? req.file.filename : null,
        status: 'pending',
    };

    const reports = readReports();
    reports.push(newReport);
    writeReports(reports);

    res.redirect('/dashboard');
});

// Admin View untuk Laporan
app.get('/admin', (req, res) => {
    res.render('admin', { reports: readReports() });
});

// Konfirmasi Laporan
app.post('/admin/:id/confirm', (req, res) => {
    const { id } = req.params;
    const reports = readReports();

    const reportIndex = reports.findIndex((r) => r.id == id);
    if (reportIndex > -1) {
        reports[reportIndex].status = 'completed';
        writeReports(reports);
    }

    res.redirect('/admin');
});

// Static Folder untuk Foto
app.use('/uploads', express.static(uploadFolder));

// Jalankan Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
