# Bank Risk Management - Supabase Version

Sistem manajemen risk dan loss event untuk bank dengan database PostgreSQL via Supabase.

## Fitur

- ✅ Login dengan database (PostgreSQL)
- ✅ Data tersimpan di cloud (bukan localStorage)
- ✅ Semua user lihat data yang sama
- ✅ Real-time sync
- ✅ Backup otomatis oleh Supabase

## Setup Database Supabase

### 1. Buat Project Supabase

1. Buka [supabase.com](https://supabase.com)
2. Sign up dengan GitHub
3. Klik "New Project"
4. Isi:
   - **Name:** `bank-risk-db`
   - **Database Password:** (buat password kuat)
   - **Region:** Singapore (atau yang terdekat)
5. Klik "Create new project"

### 2. Buat Tabel

Buka **SQL Editor** → **New query** → paste SQL berikut:

```sql
-- Tabel Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  role TEXT NOT NULL,
  cabang TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert default users
INSERT INTO users (username, password, nama, jabatan, role, cabang) VALUES
('admin', 'password', 'Administrator', 'Administrator', 'admin', 'Cabang Pusat'),
('teller1', 'password', 'Teller Satu', 'Teller', 'user', 'Cabang Pusat'),
('cs1', 'password', 'Customer Service', 'Customer Service', 'user', 'Cabang Utara'),
('kc1', 'password', 'Kepala Cabang', 'Kepala Cabang', 'admin', 'Cabang Pusat'),
('supervisor1', 'password', 'Supervisor', 'Supervisor', 'user', 'Cabang Selatan'),
('manager1', 'password', 'Manager', 'Manager', 'admin', 'Cabang Pusat');

-- Tabel Risk Events
CREATE TABLE risk_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  user_nama TEXT,
  cabang TEXT NOT NULL,
  kategori TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  tanggal_kejadian DATE NOT NULL,
  lokasi TEXT,
  penyebab TEXT NOT NULL,
  dampak TEXT NOT NULL,
  level_risiko TEXT NOT NULL,
  mitigasi TEXT NOT NULL,
  pic TEXT NOT NULL,
  target_penyelesaian DATE NOT NULL,
  status TEXT DEFAULT 'draft',
  nominal_dampak NUMERIC DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabel Loss Events
CREATE TABLE loss_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  user_nama TEXT,
  cabang TEXT NOT NULL,
  kategori_loss TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  tanggal_kejadian DATE NOT NULL,
  lokasi TEXT,
  penyebab TEXT NOT NULL,
  unit_terkait TEXT,
  nama_terlapor TEXT,
  nominal_kerugian NUMERIC DEFAULT 0,
  recovery NUMERIC DEFAULT 0,
  net_loss NUMERIC DEFAULT 0,
  keterangan_recovery TEXT,
  tindakan_segera TEXT NOT NULL,
  rencana_pencegahan TEXT,
  pic TEXT NOT NULL,
  target_penyelesaian DATE NOT NULL,
  status_pelaporan TEXT DEFAULT 'internal',
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Setup RLS (Row Level Security) - PENTING!

Kalau RLS enabled, buat policies:

```sql
-- Policies untuk users
CREATE POLICY "Allow anon select users" ON users FOR SELECT USING (true);

-- Policies untuk risk_events
CREATE POLICY "Allow anon all risk" ON risk_events FOR ALL USING (true);

-- Policies untuk loss_events
CREATE POLICY "Allow anon all loss" ON loss_events FOR ALL USING (true);
```

**Atau** disable RLS (tidak aman untuk production):
- Table Editor → klik tabel → toggle "Enable RLS" OFF

### 4. Dapatkan API Key

1. Klik **Project Settings** (ikon gear ⚙️)
2. Klik **API**
3. Copy:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public:** `eyJhbGciOiJIUzI1NiIs...`

### 5. Update File `js/supabase.js`

Edit file `js/supabase.js`, ganti:

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co';  // GANTI!
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIs...';    // GANTI!
```

## Deploy ke GitHub Pages

Sama seperti versi static:

1. Upload semua file ke repository GitHub
2. Settings → Pages → Enable
3. Akses: `https://USERNAME.github.io/bank-risk-management/`

## File Structure

```
bank-risk-supabase/
├── index.html          # Dashboard
├── login.html          # Login
├── risk-form.html      # Form Risk
├── loss-form.html      # Form Loss
├── risk-list.html      # Daftar Risk
├── loss-list.html      # Daftar Loss
├── css/
│   └── style.css       # Styling
├── js/
│   └── supabase.js     # Config & functions
└── README.md           # Dokumentasi
```

## Login Default

| Username | Password | Role |
|----------|----------|------|
| `admin` | `password` | Administrator |
| `teller1` | `password` | Teller |
| `cs1` | `password` | Customer Service |
| `kc1` | `password` | Kepala Cabang |
| `supervisor1` | `password` | Supervisor |
| `manager1` | `password` | Manager |

## Troubleshooting

**Error: "Failed to fetch"**
- Cek koneksi internet
- Cek URL dan API key sudah benar
- Cek CORS sudah di-enable di Supabase

**Error: "new row violates row-level security policy"**
- Buat RLS policies seperti di atas
- Atau disable RLS sementara

**Data tidak muncul**
- Cek browser console (F12)
- Pastikan tabel sudah ada data
- Cek RLS policies

## Keuntungan vs LocalStorage

| Fitur | LocalStorage | Supabase |
|-------|--------------|----------|
| Data tersimpan | Browser masing-masing | Cloud (semua user sama) |
| Backup | Manual export | Otomatis |
| Ganti browser | Data hilang | Data tetap ada |
| Multi device | Tidak sync | Sync otomatis |
| Setup | Mudah | Butuh config |
