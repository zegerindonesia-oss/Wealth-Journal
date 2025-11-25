# Panduan Deployment & Integrasi Supabase

Panduan ini menjelaskan cara membuat aplikasi Wealth Journal Anda dapat diakses secara online dan cara menghubungkannya ke database Supabase untuk penyimpanan data real-time.

Karena Anda sudah memiliki akun Vercel dan Supabase, langkah-langkahnya akan lebih langsung.

## 1. Deployment ke Vercel (Akses Online)

Vercel adalah cara termudah untuk men-deploy aplikasi Next.js.

### Langkah 0: Upload Kode ke GitHub (PENTING!)
**Masalah:** Jika project tidak muncul di Vercel, itu karena kodenya masih ada di laptop Anda, belum di GitHub.

1.  Buka [github.com/new](https://github.com/new).
2.  Buat repository baru (misal: `wealth-journal`). **Jangan** centang "Initialize with README".
3.  Setelah dibuat, GitHub akan menampilkan halaman dengan perintah.
4.  **Buka Terminal di VS Code**:
    *   Lihat menu di bagian paling atas aplikasi ini.
    *   Klik **Terminal** -> pilih **New Terminal**.
    *   Akan muncul panel baru di bagian bawah layar Anda.
5.  Ketik perintah ini satu per satu di terminal tersebut (ganti `USERNAME` dengan username GitHub Anda):

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/wealth-journal.git
git push -u origin main
```

*Setelah langkah ini sukses, barulah project akan muncul di Vercel.*

### Langkah 1: Import di Vercel
1.  **Login**: Masuk ke [vercel.com](https://vercel.com) dengan akun Anda.
2.  **Tambah Project Baru**: Klik "Add New..." -> "Project".
3.  **Import Repository**: Pilih repository Wealth Journal Anda dari daftar.
4.  **Konfigurasi**: Vercel secara otomatis mendeteksi Next.js. Biasanya Anda tidak perlu mengubah pengaturan build.
5.  **Environment Variables**: Masukkan variabel lingkungan di sini (seperti kunci API Supabase nanti).
6.  **Deploy**: Klik "Deploy".

Setelah selesai, Vercel akan memberikan URL aktif (contoh: `wealth-journal.vercel.app`) di mana Anda bisa mengakses aplikasi Anda dari mana saja.

---

## 2. Menghubungkan ke Supabase (Database)

### Langkah 1: Buat Project Supabase
1.  Login ke [supabase.com](https://supabase.com).
2.  Klik "New Project".
3.  Pilih organisasi Anda, beri nama project (misal: "Wealth Journal"), dan buat password database yang kuat.
4.  Pilih region yang dekat dengan pengguna (misal: **Singapore** untuk akses cepat dari Indonesia).
5.  Klik "Create new project".

### Langkah 2: Dapatkan Kunci API (Credentials)
1.  Setelah project siap, buka **Project Settings** (ikon gerigi) -> **API**.
2.  Salin `Project URL` dan `anon` public key.

### Langkah 3: Install Client Supabase
Di terminal project Anda (VS Code), jalankan perintah ini:
```bash
npm install @supabase/supabase-js
```

### Langkah 4: Konfigurasi Environment Variables
Buat file `.env.local` di root project Anda (jangan commit file ini ke Git untuk keamanan):

```env
NEXT_PUBLIC_SUPABASE_URL=url_project_anda
NEXT_PUBLIC_SUPABASE_ANON_KEY=kunci_anon_anda
```

*Catatan: Jangan lupa untuk menambahkan variabel ini juga di pengaturan "Environment Variables" di dashboard Vercel agar deployment Anda berjalan lancar.*

### Langkah 5: Inisialisasi Client Supabase
Buat file helper `lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Langkah 6: Menggunakan Database
Sekarang Anda bisa mengambil data dari database di komponen Anda. Contoh untuk mengambil data trading:

```javascript
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function TradeLog() {
  const [trades, setTrades] = useState([])

  useEffect(() => {
    getTrades()
  }, [])

  async function getTrades() {
    // Pastikan Anda sudah membuat tabel 'trades' di dashboard Supabase
    const { data, error } = await supabase
      .from('trades')
      .select('*')
    
    if (data) setTrades(data)
  }

  return (
    // ... render data trades Anda
  )
}
```

## 3. Cara Edit & Update (Workflow dengan AI)

Anda bertanya apakah bisa menggunakan **Google Antigravity** (saya) untuk mengedit? **Jawabannya: YA, tentu saja!**

Tapi alurnya seperti ini:

1.  **Minta Perubahan ke Saya**: Anda tetap meminta saya untuk mengubah kode di sini (di komputer lokal Anda).
    *   *Contoh: "Tolong ubah warna header jadi biru."*
2.  **Saya Edit File Lokal**: Saya akan mengubah file di folder `c:\Users\DELL\...` Anda.
3.  **Push ke GitHub**: Setelah Anda puas dengan perubahan saya, Anda perlu mengirimnya ke GitHub.
    *   Buka terminal dan ketik:
        ```bash
        git add .
        git commit -m "update warna header"
        git push
        ```
4.  **Otomatis Update Online**: Vercel akan mendeteksi perubahan di GitHub dan **otomatis** memperbarui website live Anda dalam hitungan detik.

Jadi, Anda **tidak perlu** mengedit manual di browser. Cukup gunakan saya sebagai "partner coding" Anda di sini, lalu push untuk meng-update website.

---

## 4. Opsi Edit Online Lainnya (Tanpa AI Lokal)

Jika Anda sedang tidak di depan komputer ini dan ingin mengedit darurat:

1.  **GitHub Codespaces**:
    - Buka repository GitHub Anda.
    - Tekan `.` (titik).
    - Edit kode manual di browser.
