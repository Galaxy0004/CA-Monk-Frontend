# CA Monk Blog Application

A modern, high-performance blog application built for the CA Monk assignment. This project demonstrates a production-ready React architecture with advanced state management, beautiful UI components, and a seamless user experience.

<img width="1912" height="908" alt="image" src="https://github.com/user-attachments/assets/e267c5b7-d531-4009-92a0-05d7b0531188" />


## 🚀 Features Implemented

### Core Requirements
- **Master-Detail Layout**: A responsive split-screen interface displaying the blog list on the left and full content on the right.
- **Data Fetching**: Powered by **TanStack Query (React Query)** for efficient caching, background updates, and loading states.
- **REST API Integration**: Full integration with a JSON Server backend for `GET` (list/details) and `POST` (create) operations.
- **Create Blog**: A fully functional form to publish new articles, complete with validation and auto-optimistic updates.

### 🎨 UI & UX Design
- **Modern Styling**: Custom-configured **Tailwind CSS** for a sleek, cleaner look.
- **Component Library**: Utilizes **Shadcn UI** for accessible, robust components (Buttons, Cards, Inputs, Skeletons).
- **Rich Typography**: optimized for readability with proper hierarchy and spacing.
- **Responsive Design**: Stacks gracefully on mobile devices; standard split-view on desktops.
- **Loading States**: Skeleton loaders provide a polished perception of performance during data fetches.

## ✨ Bonus Features & Enhancements

I went beyond the basic requirements :

1.  **Real-time Search & Filtering**:
    - Instant client-side search by title or description.
    - Category chips to filter blogs by tags (e.g., FINANCE, TECH).
2.  **Dark Mode Support**:
    - Fully integrated theme capability (Light/Dark) with persistence.
    - accessible color contrast in both modes.
3.  **Dynamic Reading Time**:
    - Automatically calculates reading time based on word count.
4.  **Polish**:
    - Glassmorphism effects in the header/sidebar.
    - Smooth animations (fade-ins, slide-ups) for route transitions.
    - "Select a blog" empty state with illustration.

<img width="901" height="904" alt="image" src="https://github.com/user-attachments/assets/a2dd04ba-54d1-423f-b5fd-4a98eba3f627" />


## 🛠️ Tech Stack

- **Frontend**: React (Vite) + TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Class Variance Authority
- **State Management**: TanStack Query v5
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Backend (Mock)**: JSON Server

## 🏃‍♂️ Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Galaxy0004/CA-Monk-Frontend.git
    cd CA-Monk-Frontend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Backend Server**
    ```bash
    npm run server
    ```
    *The API runs at http://localhost:3001*

4.  **Start the Development App**
    ```bash
    npm run dev
    ```
    *The app runs at http://localhost:5173*
