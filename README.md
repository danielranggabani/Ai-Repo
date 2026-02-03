# AI Marketing Ads Generator

Platform SaaS modern untuk membuat materi iklan menggunakan workflow berbasis AI dan Node.

## Fitur Utama

- **Node-based Workflow**: Desain visual dengan React Flow.
- **Product Fusion**: Integrasi produk ke dalam gambar AI tanpa halusinasi.
- **Brand Guardrails**: Menjaga konsistensi warna dan font brand.
- **AI Integration**: Menggunakan Google Nano Banana (Gemini) untuk generasi gambar.
- **Credit System**: Sistem kredit untuk penggunaan AI.

## Prasyarat

Pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- npm, yarn, atau pnpm

## Instalasi & Setup

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd ai-marketing-ads-generator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Konfigurasi Environment Variables**

   Salin file `.env.example` menjadi `.env.local` dan isi dengan kredensial Anda.

   ```bash
   cp .env.example .env.local
   ```

   Isi variabel berikut di `.env.local`:

   ```env
   # Neon Database
   DATABASE_URL=postgres://user:pass@ep-host.region.aws.neon.tech/neondb

   # Supabase Auth
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

   # Midtrans (Payment)
   MIDTRANS_MERCHANT_ID=your-merchant-id  <-- WAJIB DIISI
   MIDTRANS_SERVER_KEY=your-server-key
   MIDTRANS_CLIENT_KEY=your-client-key

   # Google Gemini (Nano Banana)
   GOOGLE_API_KEY=your-gemini-api-key
   ```

4. **Setup Database (Neon)**

   Anda perlu membuat tabel database. Script skema lengkap tersedia di file `schema.sql`.

   Anda dapat menjalankannya melalui Dashboard Neon (SQL Editor) atau menggunakan perintah psql jika terkoneksi.

   Isi file `schema.sql` mencakup tabel:
   - `profiles`
   - `workspaces`
   - `projects`
   - `transactions`
   - `credit_ledger`

5. **Jalankan Development Server**

   ```bash
   npm run "dev"
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Project

- `app/`: App Router Next.js (Pages, Layouts, API Routes).
- `components/`: Komponen UI (Shadcn UI) dan Custom Node React Flow.
- `stores/`: State management menggunakan Zustand.
- `lib/`: Utilitas dan konfigurasi library (Neon, utils).
- `schema.sql`: Definisi skema database.
- `postcss.config.js`: Konfigurasi Tailwind CSS (wajib ada agar style muncul).

## Catatan Troubleshooting

- **Style Tidak Muncul?**: Pastikan `postcss.config.js` ada di root project. Jika tidak, buat file tersebut (sudah disertakan dalam perbaikan ini).
- **Midtrans Error**: Pastikan `MIDTRANS_MERCHANT_ID` sudah diisi di `.env.local` sesuai dengan dashboard Midtrans Anda.

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn UI, React Flow.
- **Backend**: Next.js API Routes.
- **Database**: Neon (Serverless Postgres).
- **Auth**: Supabase Auth.
- **Payment**: Midtrans.
- **AI**: Google Gemini (via Nano Banana integration logic).

## Lisensi

[MIT](LICENSE)
