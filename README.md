# 🛍️ FakeStore - Next.js + Zustand Product App

A React (Next.js) application built using the **Fake Store API**, featuring authentication, product listing, detailed views, and update/delete functionality — all managed efficiently using **Zustand** and styled with **Tailwind CSS**.

---

## 🚀 Features

- 🔐 **Login Page** – Mock authentication (`user/password`)  
  Persists login using localStorage.
- 🧾 **Product List** – Fetches data from [FakeStoreAPI](https://fakestoreapi.com/products)  
  Displays image, title, price, and category in a responsive grid.
- 🔍 **Product Detail** – View full description, rating, and category.  
- ✏️ **Edit Product** – Update product title and price (PUT request).  
- 🗑️ **Delete Product** – Confirm and delete product instantly from API + Zustand store.  
- 💾 **Zustand Store** – Centralized caching for product list, update, and delete.  
- 🎨 **Tailwind CSS** – Clean, modern, responsive UI.  
- ⚡ **Optimized UX** – Loading spinners, error handling, and smooth transitions.

---

## 🧠 Tech Stack

- **Next.js 14+**
- **React 18+**
- **Zustand** (state management)
- **Axios** (API calls)
- **Tailwind CSS**
- **FakeStore API**

---

## 🛠️ Setup

```bash
# Clone repo
git clone https://github.com/<your-username>/fakestore-nextjs.git
cd fakestore-nextjs

# Install dependencies
npm install

# Run app
npm run dev
