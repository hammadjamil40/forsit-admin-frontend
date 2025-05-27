# Forsit Admin Dashboard

The **Forsit Admin Dashboard** is a full-stack admin panel that allows users to manage product inventory, monitor dynamic revenue trends, and register new products with image uploads.

> Built with **Vue 3 + Vite** on the frontend and **Node.js + Express** on the backend.

---

## Project Structure

```
forsit-admin-dashboard/
│
├── frontend/          # Vue 3 dashboard interface
│   ├── src/           # Views, components, routes
│   ├── vite.config.js # Vite configuration
│   └── public/        # Static assets
│
└── backend/           # Node.js API for product & file handling
    ├── server.js      # Express entry point
    └── uploads/       # Stores uploaded images (non-persistent on Render)
```

---

## Live Demo

- **Frontend (Vercel)**: `forsit-admin-frontend-new.vercel.app`
- **Backend (Render)**: `https://forsit-admin-backend.onrender.com`

---

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | Vue 3, Vite, Tailwind CSS           |
| Backend  | Node.js, Express, Multer            |
| Hosting  | Vercel (frontend), Render (backend) |
| Charting | Chart.js                            |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/hammadjamil40/forsit-admin-frontend.git
git clone https://github.com/hammadjamil40/forsit-admin-backend.git
cd forsit-admin-frontend (#for frontend)
cd forsit-admin-backend (#for backend)
```

### 2. Start Backend (Port 3001)

```bash
cd backend
npm install
node server.js
```

### 3. Start Frontend (Port 5173)

```bash
cd frontend
npm install
npm run dev
```

---

## Dashboard Navigation

### Revenue Page

- Visual chart of daily/weekly/monthly/annual revenue
- Filter by product categories
- Displays total orders & revenue

### Inventory Management

- Table with all products and their current stock levels
- Sort by name, price, or category
- Update stock and see low-inventory alerts

### Add Product

- Form to register new products
- Includes name, description, price, stock, category, and image upload
- Image is stored using `multer` in the `uploads/` folder

---

## Deployment Notes

- If deploying to **Render**, note that `/uploads` folder is not persistent. Use Cloudinary or S3 for production.
- Backend listens on `PORT=3001` by default
- You must update the frontend `BASE_URL` to match your deployed backend

---

## Thankyou!
