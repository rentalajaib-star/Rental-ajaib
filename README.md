# Rental Ajaib — Panel Admin (Tahap Awal)

Isi paket ini:
- Project React (Vite) + Tailwind CSS
- Halaman **Panel Admin** dengan sidebar: Dashboard, Setup (Mobil, Biaya Rental, Akun Pemilik), Kasir, Pendapatan
- File `src/firebase.js` sudah disiapkan untuk konek ke Firebase (Firestore + Auth), tinggal isi API key-nya
- `vercel.json` supaya routing tidak error saat di-deploy ke Vercel

Saat ini data (mobil, customer, transaksi, dll) masih **data contoh di dalam kode** (belum tersambung Firebase), supaya tampilan bisa langsung dicoba tanpa setup apa pun dulu. Menghubungkan ke Firestore beneran adalah langkah lanjutan.

## 1. Upload ke GitHub

Repo tujuan: `https://github.com/amaziabahari-svg/Rental-ajaib`

**Cara paling gampang (tanpa terminal):**
1. Buka repo di atas di browser.
2. Klik **Add file → Upload files**.
3. Drag semua isi folder ini (termasuk file yang diawali titik seperti `.gitignore` dan `.env.example` — GitHub tetap menerimanya).
4. Commit langsung ke branch `main`.

**Kalau nanti mau pakai terminal** (lebih rapi untuk update berikutnya):
```bash
cd rental-ajaib
git init
git add .
git commit -m "Setup awal: struktur project + panel admin"
git branch -M main
git remote add origin https://github.com/amaziabahari-svg/Rental-ajaib.git
git push -u origin main
```

## 2. Setup Firebase (Anda kerjakan sendiri di Firebase Console)

1. Buka [Firebase Console](https://console.firebase.google.com), buat project baru (mis. "rental-ajaib").
2. Aktifkan **Firestore Database** (mode production atau test, sesuai kebutuhan).
3. Aktifkan **Authentication** kalau nanti dipakai untuk login pemilik mobil.
4. Di **Project Settings → General → Your apps**, tambah "Web app", lalu salin nilai `apiKey`, `authDomain`, `projectId`, dst.
5. Buat file `.env` di root project (salin dari `.env.example`) dan isi nilai-nilai tadi.

## 3. Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com), login, klik **Add New → Project**.
2. Pilih repo `Rental-ajaib` dari GitHub (hubungkan akun GitHub dulu kalau belum).
3. Vercel akan otomatis mendeteksi ini project Vite — biarkan pengaturan default.
4. Di bagian **Environment Variables**, masukkan 6 variabel yang sama seperti di `.env` (VITE_FIREBASE_API_KEY, dst).
5. Klik **Deploy**. Setelah selesai, Anda dapat link `https://rental-ajaib-xxxx.vercel.app` yang bisa dibuka siapa saja.

## Menjalankan di komputer sendiri (opsional)

```bash
npm install
npm run dev
```

## Langkah berikutnya

- Hubungkan `src/pages/AdminDashboard.jsx` ke Firestore (ganti data contoh dengan data asli, baca & tulis lewat `src/firebase.js`)
- Buat Dashboard Pemilik Mobil & Dashboard Customer (menyusul, sesuai catatan awal)
- Tambahkan login (Firebase Auth) untuk Admin dan Pemilik Mobil
