# Danrak Productions – Official Website

Welcome to the official codebase for the **Danrak Productions** website — a bold, cinematic, and interactive online presence built to showcase the creative brilliance of Danrak’s founder and work. This site blends modern design with smooth animations to deliver a premium first impression that reflects the company's tagline: _"Communicating More™"_.

---

## 🔥 Key Features

- 🎬 **Immersive Hero Section**  
  A full-screen cinematic introduction featuring:
  - Backlit hero portrait with dynamic radial glow
  - Animated brand logo layered above the portrait
  - Scroll-based entrance effects using GSAP
  - On-brand visual storytelling

- 💡 **Cinematic Brand Identity**  
  - Text overlays mimic modern film title sequences  
  - Animated burst glow highlights the Danrak 'X' logo  
  - Typography and layout echo the professionalism of the brand

- 🌘 **Dark/Light Mode Toggle**  
  Visitors can switch between light and dark mode for comfort and personalization.

- 📱 **Fully Responsive Design**  
  Optimized across mobile, tablet, and desktop with careful attention to spacing and scale at every breakpoint.

- 📎 **Simple Navigation**  
  A sticky navigation bar with smooth anchor scrolling to guide users through the site.

- 📞 **Call-to-Action Driven**  
  Strategically placed buttons for “Explore Our Work” and “Start Your Project” funnel visitors toward engagement.

- 🪄 **Floating Visual Effects**  
  Softly animated colored orbs subtly float in the background, adding depth without distraction.

---

## 🎨 Tech & Design Stack

| Tool / Library      | Purpose                                 |
|---------------------|------------------------------------------|
| **React**           | JavaScript library for UI components     |
| **TypeScript**      | Strongly typed JavaScript for safety     |
| **Tailwind CSS**    | Utility-first CSS for responsive design  |
| **GSAP**            | Animation framework powering transitions |
| **React Router**    | Page navigation and internal linking     |
| **Custom Assets**   | Hero portrait, logos, and brand visuals  |

---

## 📁 Project Structure Overview

src/
├── assets/ # Hero images, logos, backgrounds

├── components/

│ ├── ui/ # Reusable UI elements like buttons

│ ├── ThemeToggle.tsx # Dark/light mode switch

│ └── sections/

│ ├── Header.tsx # Navigation bar

│ ├── Footer.tsx # Footer with social links

│ └── Hero.tsx # Main hero section with animations

├── pages/

│ └── Home.tsx # Homepage layout and structure

├── App.tsx # Entry point for routing

└── main.tsx # Vite + React DOM entry


---

## 📸 Branding Guidelines

- The **Danrak Productions** logo is integrated inline with the wordmark and should never be separated or stacked.
- Color usage across the site is inspired directly by the official palette:
  - `#2d9ed4` (Danrak Blue)
  - `#bf0052` (Magenta)
  - `#44bae9` (Light Blue)
  - `#80c257` (Bright Green)
  - `#a2d180` (Muted Green)

---

## 🚀 Deployment

This website is hosted via **WordPress with a custom domain**, utilizing either:
- Embedded React frontend
- Static React build hosted on a subdomain with WordPress as a CMS/backend

If deploying a static version, ensure assets are optimized and hosted via CDN or external storage.

---

## 👩🏽‍💻 Created By

**Debra-Kaye Smith**  
Frontend Developer & Creative Lead  
_Deputy Chairperson, CEAC @ UWI Mona | Tech Entrepreneur_
Contact: debrakayesam@gmail.com or (876)572-3625

---

## 📄 License

All branding assets, content, and source code are the intellectual property of **Danrak Productions**. Redistribution or reuse is prohibited without explicit permission.

