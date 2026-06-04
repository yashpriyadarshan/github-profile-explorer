# 🔍 GitHub Profile & Repository Explorer

A full-stack web application that allows users to search for public GitHub profiles, view detailed user statistics (bio, followers, count of public repos), visualize their programming language distribution via an interactive pie chart, and browse their repositories in an expandable list with pagination. Built as a technical exercise to demonstrate proxying third-party APIs, in-memory caching to optimize rate-limit consumption, debounced search performance, custom accessible UI elements, and a responsive design.

---

## 🔗 Live Demo Links

*   **Client**: [https://yashgithubexplorer.vercel.app](https://yashgithubexplorer.vercel.app)

---

## ✨ Features

- Search GitHub users and view their public profile information.
- Browse repositories with sorting by name, stars, or last updated date.
- Expand repositories to view additional details.
- Server-side caching to reduce GitHub API requests and rate-limit issues.
- Pagination for easier navigation of repositories.
- Loading states and comprehensive error handling.
- Fully responsive UI built with Tailwind CSS.
- ⭐ Recently searched users stored in Local Storage.
- ⭐ Debounced search for improved performance.
- ⭐ Language distribution chart for repository analytics.

## 🛠️ Tech Stack

### Frontend (Client)
*   **React 19 & Vite 8**: Used for building a highly responsive, single-page UI. Vite provides extremely fast Hot Module Replacement (HMR) and optimized production bundles.
*   **Tailwind CSS (V4)**: Provides a modern, utility-first styling system to build a polished, responsive, and user interface without writing excessive custom CSS.
*   **Recharts (v3)**: A declarative React charting library used to generate the interactive Language Distribution Pie Chart, offering smooth animations and tooltips.
*   **Axios**: Chosen for its robust promise-based API and built-in support for interceptors, request cancellation, and simplified JSON handling.

### Backend (Server)
*   **Node.js & Express.js**: Forms the lightweight proxy server. Express handles request routing, cors configurations, and payload parsers efficiently.
*   **In-Memory Cache (JavaScript Map)**: Implements a 60-second Time-To-Live (TTL) cache to save profile and repository data locally, protecting the client against GitHub's strict rate limits (60 unauthenticated requests/hour).
*   **Axios**: Fetches user profiles and repository details asynchronously from the official GitHub REST API.

---

## 🚀 How to Run Locally

Follow these steps to run the application on your local machine.

### 1. Clone & Navigate to the Repository
Open your terminal, clone the repository, and enter the project folder:
```bash
git clone https://github.com/yashpriyadarshan/github-profile-explorer.git
cd github-profile-explorer
```

### 2. Choose Your Run Method

#### Method A: Using Docker Compose (Recommended)

If you have Docker and Docker Compose installed, spin up the entire full-stack application with a single command from the project root:
```bash
docker compose up --build
```

This command automatically builds the frontend client and backend server images, configures environment variables, and binds the ports:
*   Frontend Client: **`http://localhost:5173`**
*   Backend Server API: **`http://localhost:5000`**

To stop the containers, press `Ctrl + C` or run:
```bash
docker compose down
```

---

#### Method B: Manual Node.js Setup (Alternative)

##### Prerequisites
*   **Node.js** (v18.0.0 or higher is recommended)

##### 1. Start the Backend Proxy Server
Navigate to the `server` directory, install dependencies, and start the server:
```bash
cd server
npm install
node server.js
```
The server will start running on **`http://localhost:5000`**.

##### 2. Start the Frontend Client
Open a **new terminal tab/window**, navigate to the `client` directory, install dependencies, and start the development server:
```bash
cd ../client
npm install

# Create environment file
# macOS/Linux:
cp .env.example .env

# Windows (Command Prompt):
copy .env.example .env

# Windows (PowerShell):
Copy-Item .env.example .env

# Start development server
npm run dev
```
The application will launch on **`http://localhost:5173`** (or the port output by Vite in your terminal). Open this URL in your browser to view the application.

---

## 📄 API Documentation

All client requests are proxied through our Express server to safeguard third-party APIs and handle caching.

### Get GitHub User and Repositories

*   **URL**: `/api/github/:username`
*   **Method**: `GET`
*   **Path Parameters**:
    *   `username` (string, required): The target GitHub handle (case-insensitive).
*   **Query Parameters**:
    *   `sort` (string, optional): Sort repository list. Options: `updated` *(default)*, `stars`, `name`.
    *   `page` (number, optional): Page number for paginated repository lists. Default: `1`.
    *   `limit` (number, optional): Number of repositories per page. Default: `10`.
*   **Request Body**: None.

#### Response Shape

##### **Success (200 OK)**
```json
{
  "user": {
    "login": "octocat",
    "name": "The Octocat",
    "avatarUrl": "https://avatars.githubusercontent.com/u/5832347?v=4",
    "bio": "Testing branch merge conflicts",
    "followers": 15004,
    "following": 9,
    "publicRepos": 8
  },
  "repos": [
    {
      "id": 18293049,
      "name": "boysenberry-repo-1",
      "description": "Testing git merge conflicts",
      "language": "Ruby",
      "stars": 4,
      "updatedAt": "2026-05-10T11:42:15Z",
      "htmlUrl": "https://github.com/octocat/boysenberry-repo-1",
      "openIssues": 2,
      "defaultBranch": "master"
    }
  ],
  "totalRepos": 8,
  "currentPage": 1,
  "totalPages": 1
}
```

##### **User Not Found (404 Not Found)**
```json
{
  "message": "GitHub user not found"
}
```

##### **Rate Limit Exceeded (429 Too Many Requests)**
```json
{
  "message": "GitHub API rate limit exceeded. Please try again later."
}
```

##### **Internal Server Error (500 Internal Server Error)**
```json
{
  "message": "Internal Server Error"
}
```

---

## 📁 Project Structure

Below is an overview of the folder structure and the files that live in each:

```text
.
├── client/                     # React Frontend Application
│   ├── public/                 # Static assets directly served to the browser
│   ├── src/                    # React source files
│   │   ├── api/                # Network requests configurations
│   │   │   └── githubApi.js    # Axios client configured to call our proxy server
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ErrorMessage.jsx   # Error alert card displaying backend messages
│   │   │   ├── LanguageChart.jsx  # Recharts PieChart visualizing language usage percentage
│   │   │   ├── LoadingSpinner.jsx # Animated spinner loader for active fetching states
│   │   │   ├── Pagination.jsx     # Next/Prev buttons and page trackers
│   │   │   ├── ProfileCard.jsx    # Profile card displaying user avatar & bio stats
│   │   │   ├── RepoCard.jsx       # Expandable repository details card (issues, default branch)
│   │   │   ├── RepoList.jsx       # Lists all RepoCards or renders empty states
│   │   │   ├── SearchBar.jsx      # Search input with debounced typing listeners
│   │   │   └── SortDropdown.jsx   # Dropdown menu to control sorting (name, stars, updated)
│   │   ├── pages/              # Page layouts
│   │   │   └── Home.jsx        # Main dashboard page coordinating search state & history
│   │   ├── App.css             # Component-specific styles
│   │   ├── App.jsx             # Main App layout & styling wrappers
│   │   ├── index.css           # Tailwind CSS imports & global design variables
│   │   └── main.jsx            # React root mount file
│   ├── .env.example            # Configures environment variables (VITE_API_URL)
│   ├── index.html              # HTML shell template
│   ├── vite.config.js          # Vite compilation & plugin settings
│   └── package.json            # Client scripts and dependencies
│
└── server/                     # Express Backend Proxy
    ├── cache/                  # Server-side caching logic
    │   └── cache.js            # Standard JavaScript Map serving as local in-memory cache
    ├── routes/                 # REST API endpoints routing
    │   └── githubRoutes.js     # Declares and parses /api/github/:username
    ├── service/                # Business logic & external API integration
    │   └── githubService.js    # Handles caching, fetching from GitHub, formatting payload
    ├── utils/                  # Helper utilities
    │   ├── pagination.js       # Slices the array of repos for current page
    │   └── repoSorter.js       # Sorts repos by stars, name, or update dates
    ├── server.js               # Entry point of the Express application
    └── package.json            # Server scripts and dependencies
```

---

## 🔮 Next Steps

Below are the features that were deprioritized for this initial release and what should be built next:

1.  **GitHub OAuth Integration**:
    *   *What was chosen not to do*: Authentication with the GitHub API.
    *   *Why & Next Steps*: Currently, the app uses unauthenticated requests which limits GitHub requests to 60/hour. Integrating GitHub OAuth would authenticate requests on behalf of the logged-in user, raising the limit to 5,000/hour and enabling support for viewing private repositories.
2.  **Persistent Cache (Redis)**:
    *   *What was chosen not to do*: A persistent data caching layer.
    *   *Why & Next Steps*: The backend currently stores cache in local RAM via a JavaScript `Map`. If the server restarts or scales horizontally, the cache is lost. Implementing a Redis database would make the cache persistent, shared across server instances, and scalable.
3.  **Detailed Repository Analytics**:
    *   *What was chosen not to do*: Deep repository metrics.
    *   *Why & Next Steps*: We only show basic repository details on expansion. Future additions include displaying commit history statistics, line change graphs, contribution calendars, and branch lists for each repository.
4.  **Client-side Repository Filtering**:
    *   *What was chosen not to do*: Filtering repositories by language or search queries.
    *   *Why & Next Steps*: We only support sorting. Adding a live filter input on the client would let users instantly filter down repositories (e.g., only "JavaScript" or containing "test") without requesting new backend pages.
5.  **Testing Suite**:
    *   *What was chosen not to do*: Unit, integration, and End-to-End testing.
    *   *Why & Next Steps*: Introduce **Vitest** for testing backend services and **Playwright** / **React Testing Library** for frontend UI testing.
