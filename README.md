# Fathan's Cyberpunk Portfolio 🚀

A modern, interactive cyberpunk-themed portfolio built with **Next.js**, React, and Vanilla CSS. Features an interactive terminal, typing effects, fetching live projects from GitHub, and a secure contact form.

## 🌟 Features
- **Cyberpunk Theme**: Neon glows, scanlines, and a hacker-style aesthetic.
- **Interactive Terminal**: A fully functional UI terminal component with custom commands (`help`, `whoami`, `clear`, `sudo hack`).
- **Live GitHub Projects**: Automatically fetches your latest 10 repositories from GitHub using the GitHub REST API.
- **Formspree Integration**: Contact form that sends messages directly to your email securely, without needing a backend.
- **Vercel Analytics**: Built-in website view tracking.

## 💻 Tech Stack
- **Framework:** Next.js (App Router)
- **Library:** React.js
- **Styling:** CSS (Vanilla) + Devicons + FontAwesome
- **Analytics:** `@vercel/analytics`
- **Form Handling:** `@formspree/react`

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/fathan3/porto.git
   cd porto
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Configuration

### 1. Personal Information & Skills
All the personal data, social links, and skills are stored in `src/data/data.json`. Update this file to modify the text displayed on the website.

### 2. Contact Form (Formspree)
The contact form uses [Formspree](https://formspree.io/). 
To set it up with your email:
1. Register on Formspree and create a new form.
2. Get your unique Form ID.
3. Open `src/components/Contact.tsx`.
4. Replace `mvzyqnog` inside `useForm("mvzyqnog")` with your Form ID.

### 3. Resume / CV
To update the downloadable CV file, place your PDF inside the `public/assets/cv/` directory and name it `resume.pdf`.

## 📦 Deployment

This project is fully optimized for [Vercel](https://vercel.com).
1. Push your code to a GitHub repository.
2. Create a new project in Vercel and import the repository.
3. Vercel will automatically detect the Next.js setup. Click **Deploy**.

Once deployed, the `@vercel/analytics` module will automatically start tracking your website views!

---
*Created by Fathan Ruhul Alam*
