# 🚐 VANLIFE

A van rental marketplace built with React, Vite, React Router, and Firebase Firestore. It lets users browse available vans, view detailed van information, and access a host dashboard for managing van listings and related content.

**Live demo:** [vanlife-camping.vercel.app](https://vanlife-camping.vercel.app/)

## 🎨 Design:
The UI follows the provided Figma design:
[Figma file](https://www.figma.com/design/c2UAzw7lECIHaxXu5RBB9V/-VanLife)

## ✨ Features
 
- **Browse available vans and view detailed information for each van** 
- **Filter vans by type (Simple, Luxury, Rugged)**
- **Nested routing with React Router**
- **Host dashboard** — hosts can manage their listed vans, edit pricing and photos, and view income and reviews
- **Dynamic navigation with active links**
- **Responsive design**
- **Firebase-backed data** — vans and users are stored in Firestore
- **Firebase Authentication** — with email and password

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

3. Setup your own Firebase Firestore database with `vans` and `users` collections matching the shape expected in `api.js`.
   
4. Open the local URL shown by Vite in your browser.

## Demo Login

For testing, the app includes a sample login:

- Email: `t@test.com`
- Password: `p123456`
