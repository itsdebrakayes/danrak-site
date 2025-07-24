## 🌟 DanraK Productions Website — Full Vision Overview

### 🎬 **Purpose:**

The website showcases the creative work and services of **DanraK Productions**, run by your mom. It’s built with a **cinematic, Apple-style aesthetic** to reflect a high-end production company with flair, elegance, and visual impact.

---

## 🧭 Structure & Navigation

### 🧩 **Website Sections (in scroll order):**

1. **Hero / Landing Page**
2. **About Section**
3. **Showcase Section**
4. **Contact Section**

Each section:

* Occupies **100% of the viewport height**.
* Has **smooth scroll snapping** and transitions.
* Uses **GSAP animations** for immersive entrance effects.
* Features a **section glow** effect when scrolled to (color-coded).

---

## 🖼️ 1. **Hero Section** – *“The Cinematic Entrance”*

**Inspiration**: Apple product pages + dynamic 3D hero effects.

### 💡 Design:

* **Centered composition**: Your mother’s **portrait image** appears slightly **to the right**.
* On the **left side**, the **DanraK Productions logo or name** is displayed boldly.
* A **burst of business brand colors** radiates behind her (colors: `#2d9ed4`, `#bf0052`, `#44bae9`, `#80c257`, `#a2d180`).
* Her image appears to **emerge from the screen**, giving a 3D depth feel, as if she’s stepping forward into the spotlight.

### 🌈 Light/Dark Mode:

* In **dark mode**, the background is deep black with luminous neon accents.
* In **light mode**, the design switches to crisp white backgrounds with black text and softened highlight bursts.

---

## 👤 2. **About Section** – *“The Story Behind the Production”*

### 💡 Design:

* Minimalist and elegant.
* Her image shifts from the hero section to a **new pose** or layout (like a cinematic scene change).
* Includes:

  * A short bio.
  * The mission or vision of DanraK Productions.
  * Brief highlight of services.

### 🌀 Animation:

* GSAP entrance effects animate the section in as the user scrolls.
* Slight background movement (parallax or fade-in) to enhance visual flow.

---

## 🎥 3. **Showcase Section** – *“Where Past Events Come to Life”*

**Inspiration**: The video you shared of the scrolling events showcase (exact replica requested).

### 💡 Design:

* **Horizontally scrollable section** where events flow from **right to left**.
* **Start centered** on the most current event.
* Each event has:

  * A **rounded-rectangle thumbnail** (not circular).
  * Thumbnail floats in front of a **fullscreen background** version of that same image.
* When a thumbnail is **clicked**:

  * It **expands** to show a short write-up and a **“Read Full Article”** button that links to the full event page.

### 🌀 Animation:

* GSAP-powered **entrance animations** on each thumbnail.
* Smooth scroll with snappy transitions and fade effects.
* Background dynamically updates as the user scrolls horizontally.

---

## 📬 4. **Contact Section** – *“Get in Touch”*

### 💡 Design:

* A **modern, glowing form** over a blurred gradient background (uses your brand colors).
* Form fields:

  * Name
  * Email
  * Message
* Styled with **frosted glass effect** (`backdrop-blur`), elegant spacing, and soft shadows.
* Below the form: **clickable social icons** (Instagram, LinkedIn, YouTube).

---

## 🧭 Floating Footer Nav – *“Elegant Navigation”*

**Inspiration**: iPhone swipe-up handle + interactive section marker.

### 💡 Design:

* A **floating, oval-shaped transparent nav bar** fixed slightly above the screen bottom.
* Contains **four colored bars**, each representing one section:

  * Hero: `#2d9ed4`
  * About: `#bf0052`
  * Showcase: `#44bae9`
  * Contact: `#80c257` (or black/white depending on mode)
* Bars are **long and thin**, like the iPhone home indicator.

### 🔄 Functionality:

* Clicking a nav bar:

  * Scrolls smoothly to its section.
  * Triggers a **soft neon glow** around that section (matching its color).
* On **hover**, the nav bar reveals a **tooltip name** of the section.

---

## 🌗 Theme Switching – *“Light & Dark Personality”*

### 💡 Design:

* A **sun/moon toggle button** floats in the top-right corner.
* On click:

  * Light mode = sun icon → bright white background, black text.
  * Dark mode = moon icon → deep black background, white text.
* Glow and nav colors adapt to the current theme.

---

## 🧰 Tech Stack Summary

| Technology           | Purpose                                        |
| -------------------- | ---------------------------------------------- |
| **React**            | Frontend UI library                            |
| **GSAP**             | Advanced scroll + animation handling           |
| **Tailwind CSS**     | Utility-first styling + responsive layout      |
| **React Router**     | Handles page links (e.g., full event articles) |
| **React Icons**      | Sun/Moon toggle, social icons                  |
| **Create React App** | Base framework                                 |
