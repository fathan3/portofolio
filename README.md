# Fathan's Cyberpunk Bento Portfolio

**Live Preview:** [https://fathanruhulalam.vercel.app/](https://fathanruhulalam.vercel.app/)

A modern, interactive cyberpunk-themed portfolio built with **Next.js**, React, and Vanilla CSS. It features a sleek Bento-box layout, an interactive terminal, dynamic GitHub project fetching (with SSR caching), and an on-the-fly theme switcher.

## Features
- **Bento Grid Layout**: Modern, responsive UI inspired by bento boxes.
- **Dynamic Theme Switcher**: Toggle between 3 built-in themes: `Monochrome` (default), `Matrix` (Hacker Green), and `Neon` (Cyberpunk Blue).
- **Interactive Terminal**: A fully functional UI terminal component with custom commands (`help`, `whoami`, `clear`, `sudo hack`).
- **Live GitHub Projects**: Automatically fetches your latest repositories and their respective programming languages using the GitHub REST API. Uses Next.js Server-Side Caching to prevent API rate limits.
- **Formspree Integration**: Contact form that sends messages directly to your email securely, without needing a backend.
- **Vercel Analytics**: Built-in website view tracking.

## Tech Stack
- **Framework:** Next.js (App Router, SSR)
- **Library:** React.js
- **Styling:** CSS (Vanilla) + Devicons + FontAwesome
- **Analytics:** `@vercel/analytics`
- **Form Handling:** `@formspree/react`

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**:
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

## Configuration

### 1. Personal Information & Skills
All personal data, social links, and core competencies are stored centrally in `src/data/data.json`. Update this file to modify the text displayed on the website.

### 2. Contact Form (Formspree)
The contact form uses [Formspree](https://formspree.io/). 
To set it up with your email:
1. Register on Formspree and create a new form.
2. Get your unique Form ID.
3. Open `src/components/Contact.tsx`.
4. Replace `mvzyqnog` inside `useForm("mvzyqnog")` with your Form ID.

### 3. GitHub API Fetching
The portfolio fetches repositories from the username specified in `data.json`. The fetch uses Next.js `{ next: { revalidate: 3600 } }` to cache the response for 1 hour, preventing GitHub API rate limit errors (403 Forbidden).

## Deployment

This project is fully optimized for [Vercel](https://vercel.com).
1. Push your code to a GitHub repository.
2. Create a new project in Vercel and import the repository.
3. Vercel will automatically detect the Next.js setup. Click **Deploy**.

Once deployed, the `@vercel/analytics` module will automatically start tracking your website views.

---
*Created by Fathan Ruhul Alam*
