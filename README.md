# 🌿 Sekayu Coffee & Eatery — Website Profil & Booking

Website profil resmi dan sistem booking meja untuk **Sekayu Coffee & Eatery** — cafe dengan suasana hangat kayu dan tanaman di Kunduran, Blora, Jawa Tengah.

---

## ✅ Fitur yang Sudah Diimplementasikan

### 🎨 Tampilan & UI
- **Hero Section** full-width dengan foto interior asli Sekayu, headline, dan dua CTA button
- **Navbar** sticky dengan scroll detection + highlight active section + mobile hamburger menu
- **About Section** dengan foto galeri grid 2x2 menggunakan foto asli
- **Gallery Strip** horizontal scroll berisi 6 foto suasana dan makanan
- **Tema warm cozy** — palet warna wood brown + gold + cream sesuai brief
- **Font Playfair Display** (serif elegan) + Poppins (body clean)
- **AOS scroll animation** di semua section
- **Fully responsive** — mobile-first, breakpoint 480px / 768px / 1024px

### 🍜 Menu & Keranjang
- **12 item menu** dalam 4 kategori: Mie Kuah, Nasi & Ayam, Snack, Minuman
- **Filter tab** per kategori (animasi hide/show)
- **Quantity selector** (+/-) per item dengan animasi pop
- **Floating Cart Button** (FAB) di kanan bawah dengan badge hitungan item
- **Cart Drawer** slide-in dari kanan dengan daftar item + total harga
- **Toast notification** saat item ditambah/dihapus dari keranjang

### 📋 Booking & WhatsApp
- **Form booking** lengkap: Nama, No. HP, Tanggal, Jam (dropdown), Jumlah Orang, Catatan
- **Guest counter** dengan tombol +/- yang elegan
- **Ringkasan pesanan** real-time di sebelah form
- **Total estimasi harga** otomatis dari keranjang
- **Tombol "Konfirmasi via WhatsApp"** → membuka WA ke `082246034954` dengan pesan terisi otomatis sesuai template
- Tanggal minimum = hari ini (tidak bisa booking masa lalu)

### 📍 Lokasi & Kontak
- **Google Maps embed** area Kunduran, Kab. Blora
- Info lengkap: alamat, jam operasional, WhatsApp, Instagram
- Tombol "Chat Sekarang" ke WhatsApp & "Follow Kami" ke Instagram

### 🦶 Footer
- Logo + deskripsi singkat
- Link navigasi, kontak lengkap, ikon sosmed

---

## 🗂️ Struktur File

```
index.html          — Halaman utama (semua section)
css/
  style.css         — Semua CSS (3000+ baris, termasuk responsive)
js/
  main.js           — Semua logika JavaScript
README.md           — Dokumentasi ini
```

---

## 🔗 Entry Points

| Path | Deskripsi |
|------|-----------|
| `/` atau `index.html` | Halaman utama |
| `#about` | Section tentang & galeri |
| `#menu` | Section menu & harga |
| `#booking` | Form booking meja |
| `#location` | Lokasi & kontak |

---

## 📞 Kontak Bisnis

| Info | Detail |
|------|--------|
| **Nama** | Sekayu Coffee & Eatery |
| **Alamat** | Kunduran, Kec. Kunduran, Kab. Blora, Jawa Tengah 58255 |
| **WhatsApp** | 082246034954 → `https://wa.me/6282246034954` |
| **Instagram** | @sekayucafe.id |
| **Jam Buka** | Setiap hari 10.00 – 22.00 WIB *(estimasi, perlu konfirmasi klien)* |

---

## 🍽️ Data Menu (Estimasi)

| Kategori | Item | Harga |
|----------|------|-------|
| Mie Kuah | Mie Kuah Sekayu Original | Rp 15.000 |
| Mie Kuah | Mie Kuah Sekayu Pedas | Rp 17.000 |
| Nasi & Ayam | Nasi Ayam Bakar | Rp 20.000 |
| Nasi & Ayam | Nasi Ayam Goreng | Rp 20.000 |
| Snack | Kentang Goreng | Rp 12.000 |
| Snack | Roti Bakar | Rp 10.000 |
| Snack | Nugget Goreng | Rp 13.000 |
| Snack | Cheese Stick | Rp 13.000 |
| Minuman | Es Teh Sekayu | Rp 5.000 |
| Minuman | Kopi Susu Sekayu | Rp 12.000 |
| Minuman | Jus Buah Segar | Rp 10.000 |
| Minuman | Minuman Dingin Lainnya | Rp 8.000 |

> ⚠️ Harga adalah estimasi. Perlu dikonfirmasi dengan klien.

---

## 🚧 Fitur Belum Diimplementasikan

- [ ] Foto menu dari kamera (semua menggunakan foto suasana interior)
- [ ] Sistem validasi kapasitas meja / slot waktu (anti-overbooking)
- [ ] DP / booking fee online
- [ ] Galeri foto lebih banyak (lightbox full modal)
- [ ] Menu lengkap dengan harga resmi dari klien
- [ ] Jam operasional resmi (perlu konfirmasi klien)
- [ ] Google Maps pin yang tepat ke lokasi Sekayu

---

## 📋 Yang Perlu Dikonfirmasi ke Klien

1. **Jam operasional** resmi (saat ini: estimasi 10.00–22.00 setiap hari)
2. **Daftar menu + harga resmi** yang sudah final
3. **Foto menu** masing-masing item (agar card menu lebih akurat)
4. **Pin lokasi Google Maps** yang tepat untuk Sekayu Coffee & Eatery
5. Apakah perlu **sistem DP/booking fee**?
6. **Kapasitas meja** untuk fitur anti-overbooking

---

## 🔧 Teknologi yang Digunakan

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animasi
- **Vanilla JavaScript** — Cart state, WA redirect, filter menu
- **Google Fonts** — Playfair Display + Poppins (via CDN)
- **Font Awesome 6** — Icons (via jsDelivr CDN)
- **AOS.js** — Scroll animations (via jsDelivr CDN)
- **WhatsApp Click-to-Chat** — `wa.me` link, tidak butuh approval API

---

## 🚀 Cara Deploy

Klik tombol **Publish** di tab Publish untuk mempublikasikan website ini secara langsung.
