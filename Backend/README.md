# Sri Durga Varahi Amma Devalayam – Backend & Admin Management

This module documents the administrative backend architecture and data management system for **Sri Durga Varahi Amma Devalayam**, Pisini.

## Administrative Dashboard Features

The Admin Portal is accessible at:
- **URL**: `http://localhost:8080/admin`
- **Default Master Passkey**: `varahi2026` (or `admin`)

### 1. Gallery Manager
- **Capabilities**:
  - Upload high-resolution photos directly from desktop/mobile (auto-converted to data URI for immediate persistent storage).
  - Add external image URLs.
  - Set bilingual titles and descriptions in English and Telugu.
  - Assign categories: `Sanctum`, `Alankaram`, `Utsavam`, `Devotees`.
  - Delete outdated photos.
  - Real-time instant synchronization with the public `/` gallery grid and lightbox modal.

### 2. Pujas & Events Manager
- **Capabilities**:
  - Add and manage Daily Pujas (`Nitya Abhishekam`, `Kumkuma Puja`, `Sahasranamarchana`, `Rahu Kala Puja`, etc.).
  - Add and manage Grand Festival Events (`Sri Durga Varahi Navaratri Utsavalu`, `Panchami Mahotsavam`).
  - Configure Puja Timings, Dakshina / Ticket Amount, and bilingual Telugu/English ritual details.
  - Toggle Active / Hidden status to dynamically control display on the public website.
  - Delete puja records.

### 3. Anna Prasadam Manager
- **Capabilities**:
  - Manage the **Sri Durga Varahi Nitya Annadanam Scheme**.
  - Dynamically update the daily serving count (e.g. `1,500+ Devotees Served Daily`) and meal distribution timings (`12:30 PM - 03:00 PM Daily`).
  - Add specific Prasadam dishes (`Maha Anna Prasadam`, `Pulihora`, `Chakkara Pongali`, `Daddojanam`, `Ghee Laddu`).
  - Configure availability status (`Available Today` vs `Not Available`) and price/contribution details.

## Data Store & Persistence Architecture
- Core Store: `src/lib/templeStore.tsx`
- Syncs seamlessly to `localStorage` across page reloads and browser sessions.
- React Context reactive architecture triggers automatic zero-latency UI re-renders on both `/` and `/admin`.
- Factory reset option available to restore canonical temple defaults at any time.
