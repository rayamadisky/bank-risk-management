# Bank Risk Management - Static Version

Sistem manajemen risk dan loss event untuk bank berbasis HTML/CSS/JavaScript murni. **Tidak memerlukan server atau database** - data disimpan di browser menggunakan localStorage.

## Fitur

### Autentikasi
- Login system dengan role-based access
- Default users tersedia (password: "password"):
  - `admin` - Administrator
  - `teller1` - Teller
  - `cs1` - Customer Service
  - `kc1` - Kepala Cabang
  - `supervisor1` - Supervisor
  - `manager1` - Manager

### Formulir
- **Risk Event Form** - Input risk dengan kategori (Operasional, Kredit, Pasar, dll) dan level risk (Rendah, Sedang, Tinggi, Ekstrem)
- **Loss Event Form** - Input loss dengan 7 kategori Basel (Internal Fraud, External Fraud, Employment Practices, dll) dan perhitungan Net Loss otomatis

### Manajemen Data
- Dashboard dengan statistik real-time
- Daftar Risk Event dengan filter dan pencarian
- Daftar Loss Event dengan filter dan pencarian
- Export/Import data ke format JSON (untuk backup)

## Cara Deploy ke GitHub Pages

### 1. Buat Repository GitHub
1. Login ke [GitHub](https://github.com)
2. Klik tombol "+" di pojok kanan atas → "New repository"
3. Isi nama repository: `bank-risk-management`
4. Pilih "Public"
5. Klik "Create repository"

### 2. Upload File

#### Cara 1: Upload Manual (Mudah)
1. Di halaman repository, klik "uploading an existing file"
2. Drag & drop semua file dari folder `bank-risk-static/`
3. Klik "Commit changes"

#### Cara 2: Menggunakan Git
```bash
# Masuk ke folder project
cd bank-risk-static

# Inisialisasi git
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit"

# Tambahkan remote repository (ganti USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/USERNAME/bank-risk-management.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

### 3. Aktifkan GitHub Pages
1. Di repository GitHub, klik tab "Settings"
2. Di sidebar kiri, klik "Pages"
3. Di bagian "Source", pilih "Deploy from a branch"
4. Pilih branch "main" dan folder "/ (root)"
5. Klik "Save"
6. Tunggu 1-2 menit, lalu akses URL yang muncul (biasanya: `https://USERNAME.github.io/bank-risk-management/`)

## Struktur File

```
bank-risk-static/
├── index.html          # Dashboard utama
├── login.html          # Halaman login
├── risk-form.html      # Form input risk event
├── loss-form.html      # Form input loss event
├── risk-list.html      # Daftar risk events
├── loss-list.html      # Daftar loss events
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── app.js          # JavaScript utama (localStorage, auth, dll)
└── README.md           # File ini
```

## Cara Penggunaan

### Login Pertama Kali
1. Buka halaman login
2. Masukkan username: `admin` dan password: `password`
3. Klik "Masuk"

### Input Risk Event
1. Klik menu "Risk Event" atau tombol "Risk Baru"
2. Isi form dengan informasi risk
3. Pilih level risk (Rendah/Sedang/Tinggi/Ekstrem)
4. Klik "Simpan"

### Input Loss Event
1. Klik menu "Loss Event" atau tombol "Loss Baru"
2. Pilih kategori loss sesuai Basel
3. Isi deskripsi dan nominal kerugian
4. Isi recovery (jika ada)
5. Net Loss akan dihitung otomatis
6. Klik "Simpan Loss Event"

### Backup Data
1. Di dashboard, bagian "Manajemen Data"
2. Klik "Export Data (JSON)"
3. File JSON akan di-download
4. Simpan file tersebut sebagai backup

### Restore Data
1. Di dashboard, bagian "Manajemen Data"
2. Klik "Import Data (JSON)"
3. Pilih file backup JSON
4. Konfirmasi untuk mengganti data saat ini

## Catatan Penting

- **Data tersimpan di browser** - Jika Anda menghapus cache/browser data, data akan hilang
- **Gunakan Export secara berkala** untuk backup data
- **Setiap browser/device memiliki data terpisah**
- **Untuk akses dari multiple device**, export data dari device A lalu import ke device B

## Teknologi

- Pure HTML5, CSS3, JavaScript (ES6+)
- Tidak ada framework atau library eksternal
- localStorage untuk penyimpanan data
- SessionStorage untuk autentikasi

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## License

Free to use for personal or commercial purposes.
