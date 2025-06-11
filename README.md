# TFLIX

A responsive web app that allows users to discover which streaming platforms offer a specific movie or TV show. It includes trending content, trailers, detailed descriptions, cast info, a personalized wishlist, and customizable user profiles.

🔗 [Live Demo](https://emire-haouas.dev/tflix/)

![Preview](https://raw.githubusercontent.com/EmireHaouas/tflix/refs/heads/main/src/assets/imgs/tflixScreenshot.gif)

---

## ✨ Features

- 🔎 Search for movies and TV shows across multiple streaming platforms
- 🔥 View real-time trending content
- ▶️ Watch trailers directly within the app
- 📋 Access detailed descriptions, cast info, and ratings
- ❤️ Save favorites to a personal wishlist
- 🌐 Personalized recommendations based on user preferences
- 🧑‍💻 User authentication via Firebase
- 🖼️ Avatar selection during registration and profile editing
- 🌍 Set language and country preferences
- 🔁 Edit profile (pseudo, avatar, language, country) at any time
- ⏳ Loading spinners for login, registration, and profile updates
- ✅ LocalStorage caching for faster profile load
- 📱 Fully responsive design for desktop, tablet, and mobile

---
## 📸 Feature Demos

### 👤 Profile Editing

<p align="center">
  <img src="https://raw.githubusercontent.com/EmireHaouas/tflix/refs/heads/main/src/assets/imgs/screen1.gif" alt="Profile Editing" width="400"/>
</p>

**Users can edit their avatar, pseudo, language and country directly from their profile.**

---

### 🔎 Movie Search

<p align="center">
  <img src="https://raw.githubusercontent.com/EmireHaouas/tflix/refs/heads/main/src/assets/imgs/screen4.gif" alt="Search Feature" width="400"/>
</p>

**Real-time search across multiple streaming platforms using TMDB API.**

---

### ❤️ Wishlist Usage

<p align=center">
  <img src="https://raw.githubusercontent.com/EmireHaouas/tflix/refs/heads/main/src/assets/imgs/screen2.gif" alt="Wishlist Add" width="300"/>
  <img src="https://raw.githubusercontent.com/EmireHaouas/tflix/refs/heads/main/src/assets/imgs/screen3.gif" alt="Wishlist Remove" width="170"/>
</p>

**Add or remove movies and shows from a personal wishlist with a simple click.**

---

### 🎬 Trailer Playback

<p align="center">
  <img src="https://raw.githubusercontent.com/EmireHaouas/tflix/refs/heads/main/src/assets/imgs/screen5.gif" alt="Trailer Playback" width="600" style="border-radius: 15px"/>
</p>

**Users can instantly watch trailers without leaving the app.**

---

### 🔥 Trending Content

<p align="center">
  <img src="https://raw.githubusercontent.com/EmireHaouas/tflix/refs/heads/main/src/assets/imgs/screen6.gif" alt="Trending Content" width="600"/>
</p>

**Homepage features trending movies and TV shows with smooth horizontal scrolling.**

---


## 🛠️ Technologies

- **Frontend**: React, Vite
- **Styling**: Custom CSS
- **Authentication & Data**: Firebase (Auth & Firestore), TMDB API
- **Storage**: Firebase + LocalStorage

---

## 🚀 Installation

To run the project locally:

```bash
git clone https://github.com/EmireHaouas/tflix.git
cd tflix
npm install
npm run dev
```

Then open your browser at [http://localhost:5173](http://localhost:5173)

---

## 🧪 Recent Improvements 

- 🔄 Added loading spinners to login, registration, and profile save buttons
- 🎭 Implemented profile editing (including avatar, country, language, and pseudo)
- 📷 Created dynamic avatar system with multiple choices (Disney-style, pop culture, etc.)
- ⚙️ Improved form validation and error handling
- 💾 Cached user profile in `localStorage` for smoother UX
- 🎨 UI refinements to select dropdowns and responsive layout

---

## 🔮 Future Features

- 📺 Multi-language interface
- 📊 Viewing history and analytics
- 🎬 Trailer playback enhancements
- 🧠 Smarter recommendation engine
- 🔔 Notifications and reminders for upcoming releases

---

Feel free to contribute by submitting issues or pull requests!
