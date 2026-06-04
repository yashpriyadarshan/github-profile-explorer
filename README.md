# GitHub Profile & Repository Explorer

A full-stack web application that allows users to explore public GitHub profiles and their repositories. Built as a technical exercise to demonstrate proxying third-party APIs, in-memory caching, rate-limit resilience, responsive design, and smooth user interactions.

---

## 🚀 Key Features

* **Proxy Server Architecture**: All client requests are proxied through an Express server. This hides GitHub API keys (or tokens) from the client and enables centralized caching.
* **Server-Side In-Memory Caching**: Implements a 60-second TTL (Time-to-Live) in-memory cache for profiles and repositories to prevent redundant API hits and safeguard against GitHub's rate limits.
* **Debounced Search**: Features search-as-you-type with a 500ms debounce window on the frontend, ensuring the backend is not overloaded during active typing.
* **Language Distribution Chart**: Calculates user language statistics across the fetched repositories and visualizes them using a clean, interactive Pie Chart powered by Recharts.
* **Collapsible Repo Details**: Users can click any repository card to expand details like the count of open issues, the default branch, and a direct link to the repository on GitHub.
* **Client-Side Persistent History**: Persists the last 5 successful searches in `localStorage` for easy one-click retrieval.
* **Responsive Styling & Micro-interactions**: Beautiful, responsive layout styled with Tailwind CSS (V4), featuring custom, accessible hover dropdowns and interactive buttons optimized for both mobile and desktop screens.

---

## 🛠️ Technology Stack

### Frontend (Client)
* **Framework**: React 19 + Vite 8
* **Styling**: Tailwind CSS (V4)
* **Charts**: Recharts
* **HTTP Client**: Axios

### Backend (Server)
* **Environment**: Node.js
* **Framework**: Express.js
* **HTTP Client**: Axios

---

## 📁 Project Structure

```text
github-repo-explorer/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── api/            # API integration Layer
│   │   ├── components/     # Reusable UI Components (SearchBar, SortDropdown, RepoCard, etc.)
│   │   ├── pages/          # Page layouts (Home page)
│   │   ├── App.jsx         # Main App Wrapper
│   │   └── index.css       # Tailwind configuration & core styles
│   └── package.json
│
├── server/                 # Express Backend Proxy
│   ├── cache/              # In-memory caching logic
│   ├── routes/             # REST API Routes
│   ├── service/            # GitHub API service logic
│   ├── utils/              # Helper utilities (sorting, pagination)
│   ├── server.js           # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🧩 Component & Modules Mapping ("What is used for What")

### Frontend (Client)

* **[Home.jsx](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/pages/Home.jsx)**: The central dashboard component. It acts as the state hub, managing profile data, loaders, error messages, search history list, current sorting choice, search parameters, and pages. It coordinates all child components and mounts the `useEffect` hooks for debounced fetching and local storage syncing.
* **[SearchBar.jsx](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/components/SearchBar.jsx)**: Renders the search text field and action button. Binds state values and submits form queries to trigger user queries.
* **[ProfileCard.jsx](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/components/ProfileCard.jsx)**: Displays user details including their profile picture, bio description, followers/following tallies, and overall repository counts.
* **[LanguageChart.jsx](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/components/LanguageChart.jsx)**: Implements an interactive **Recharts** `PieChart` to display the percentage distribution of programming languages used across the user's repositories.
* **[RepoList.jsx](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/components/RepoList.jsx)**: A container layout that loops over the returned repositories array, renders individual `RepoCard` units, and manages empty status messaging.
* **[RepoCard.jsx](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/components/RepoCard.jsx)**: Renders descriptive details for a single repository. Includes toggleable state (`expanded`) to reveal details on click (open issues count, default branch, link to GitHub).
* **[SortDropdown.jsx](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/components/SortDropdown.jsx)**: Renders a custom styled dropdown to let users select and toggle sorting criteria (`updated` | `stars` | `name`).
* **[Pagination.jsx](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/components/Pagination.jsx)**: Renders pagination navigators (`Previous` / `Next`) and tracks page progress.
* **[LoadingSpinner.jsx](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/components/LoadingSpinner.jsx)**: A lightweight animated spinner shown during asynchronous network loads.
* **[ErrorMessage.jsx](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/components/ErrorMessage.jsx)**: Renders error notification alerts (e.g., "GitHub user not found") to the user.
* **[githubApi.js](file:///Ubuntu/home/yash/Code/github-repo-explorer/client/src/api/githubApi.js)**: Configures and exports an **Axios** client configured to call the Express API.

### Backend (Server)

* **[server.js](file:///Ubuntu/home/yash/Code/github-repo-explorer/server/server.js)**: Configures the Node environment, registers CORS and parser filters, mounts the GitHub route handlers, and hosts the app on port `5000`.
* **[githubRoutes.js](file:///Ubuntu/home/yash/Code/github-repo-explorer/server/routes/githubRoutes.js)**: Maps the HTTP endpoint `GET /api/github/:username`, reads request parameters, runs the service query, and handles response codes (e.g., `404` for not found, `429` for rate limits).
* **[githubService.js](file:///Ubuntu/home/yash/Code/github-repo-explorer/server/service/githubService.js)**: Fetches raw JSON profiles and repository data from the GitHub API using **Axios**, models and filters the payloads, tracks cache timers, and returns local sorting and pagination slices.
* **[cache.js](file:///Ubuntu/home/yash/Code/github-repo-explorer/server/cache/cache.js)**: Simple `Map` wrapper that handles in-memory cache operations.
* **[repoSorter.js](file:///Ubuntu/home/yash/Code/github-repo-explorer/server/utils/repoSorter.js)**: Sorts lists of repositories in ascending/descending directions by name, star counts, or last updated dates.
* **[pagination.js](file:///Ubuntu/home/yash/Code/github-repo-explorer/server/utils/pagination.js)**: Helper utility that slices the repositories array into chunks matching the requested page and limit.

---

## ⚙️ Setup & Installation

### Prerequisites
* [Node.js](https://nodejs.org/) (v20+ recommended)
* [npm](https://www.npmjs.com/)

### 1. Server Configuration
Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Configure environment variables:
Create a `.env` file in the `server` directory:
```env
PORT=5000
# Optional: Provide a token to increase the rate limit to 5000 req/hr
GITHUB_TOKEN=your_personal_access_token_here
```

Start the backend server:
```bash
npm start
```
The server will start running at `http://localhost:5000`.

---

### 2. Client Configuration
Navigate to the client directory:
```bash
cd ../client
```

Install dependencies:
```bash
npm install
```

Configure environment variables:
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api/github
```

Start the Vite development server:
```bash
npm run dev
```
The application will be accessible at the port outputted by Vite (typically `http://localhost:5173`).

---

## 🧠 Design Decisions & Tradeoffs

### 1. Backend vs. Frontend Pagination
* **Decision**: Fetching up to 100 repositories from GitHub initially, caching them in the backend, and then sorting and paginating locally.
* **Why**: Since GitHub's rate limits are strictly enforced (especially for unauthenticated clients), loading up to 100 repositories at once and caching them yields a much better user experience. Sorting and pagination transitions are instantaneous for the client, and the backend only makes a single cached call to GitHub instead of making a new rate-limited call every time the page changes.

### 2. Debouncing & Input State
* **Decision**: Binding the search input to a debounced `useEffect` timer, while preserving a physical "Search" submit button.
* **Why**: Providing both allows desktop users to experience fast, automatic search results as they type, while mobile users can complete typing and tap "Search" without triggering unfinished queries prematurely.

### 3. Lightweight Custom Dropdown
* **Decision**: Upgraded the standard `<select>` to a hybrid mouse-hover (PC) / tap-to-toggle (mobile) custom dropdown component.
* **Why**: Native elements are notoriously hard to style cleanly, but pure CSS hover menus break on mobile touch devices. By implementing a click-outside hook alongside mouse enter/leave events, the dropdown functions flawlessly and looks premium on both platforms.

---

## 📬 Contact & Submission Details
* **Author**: Yash
* **Brief By**: Studio Graphene (hello@studiographene.com)
