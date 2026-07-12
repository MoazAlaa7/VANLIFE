# 🚐 VANLIFE

A van rental marketplace built with React, Vite, React Router, and Firebase Firestore. It lets users browse available vans, view detailed van information, and access a host dashboard for managing van listings and related content.

**Live demo:** [vanlife-camping.vercel.app](https://vanlife-camping.vercel.app/)

## ✨ Features
 
- **Browse available vans and view detailed information for each van** 
- **Filter vans by type (Simple, Luxury, Rugged)**
- **Nested routing with React Router**
- **Host dashboard** — hosts can manage their listed vans, edit pricing and photos, and view income and reviews
- **Dynamic navigation with active links**
- **Responsive design**
- **Firebase-backed data** — vans and users are stored in Firestore

## Tech Stack

- React 19
- React Router
- Vite
- Firebase Firestore
- ESLint

## 🚀 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the local URL shown by Vite in your browser.

## Demo Login

For testing, the app includes a sample login:

- Email: `t@test.com`
- Password: `p123`

⚠️ **Auth is mocked, not production-grade.** `loginUser` in `api.js` queries Firestore for a document where `password` matches a plaintext field — passwords are not hashed and **`hostId` is hardcoded to `"123"`**, so every "host" sees the same fixed set of vans regardless of who's logged in. Replace with [Firebase Auth](https://firebase.google.com/docs/auth) before treating this as anything beyond a learning project.
