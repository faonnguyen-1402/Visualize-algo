# VizAlgo - Visualize Algorithm Platform

VizAlgo is a modern, comprehensive web platform designed to empower students and developers to master complex algorithms. It achieves this through interactive visualizations, hands-on coding practice, and real-time execution feedback, making abstract concepts tangible and engaging.

## 📋 Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)
- **Git**

##  Features
### 1. Interactive Learning
Dive deep into algorithms with step-by-step visualizations. See data structures transform and elements interact in real-time (Bubble Sort, Quick Sort, Binary Search, etc.).

### 2. Practice Coding
Apply your knowledge by solving coding exercises directly within the platform. With support for multiple programming languages, VizAlgo bridges the gap between visual understanding and practical implementation.

### 3. Real-time Execution
Execute your code instantly and get immediate, comprehensive feedback. This includes:
-   **Test Case Results:** Clearly see which test cases pass or fail.
-   **Performance Metrics:** Monitor runtime and memory usage to optimize your solutions.
-   **Execution Output:** Review the direct output of your code.

### 4. Comprehensive Algorithm Categories
Explore a wide array of algorithms categorized for easy navigation:
-   **Sorting Algorithms:** Understand the mechanics of Bubble Sort, Quick Sort, and more.
-   **Searching Algorithms:** Master Linear Search, Binary Search, and other search techniques.

### 5. Multilingual Support
VizAlgo is built with global accessibility in mind, offering full support for both **English** and **Vietnamese** languages.

### 6. Personal Profile & Progress Tracking
Keep track of your learning journey with a personalized profile:
-   **Exercise Tracking:** Monitor all your completed coding challenges.
-   **Activity Heatmaps:** Visualize your coding activity over 365 days.
-   **Difficulty Progress:** Track your mastery across Easy, Medium, and Hard difficulty levels.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, i18next (Internationalization), CSS3 (Modern UI/Dark Mode).
- **Backend:** NestJS, Node.js.
- **Database:** PostgreSQL (managed via Supabase) + Prisma ORM.

## ⚙️ Environment Setup
To run the project, you must configure the environment variables for both the client and the server.

### 1. Backend Setup
Navigate to the `server/` directory and create a `.env` file:
```bash
cd server
cp .env.example .env
```
Update `.env` with your credentials:
```env
DATABASE_URL="your_supabase_postgresql_connection_string"
JWT_SECRET="your_secret_key"
PORT=4000
```

### 2. Frontend Setup
Navigate to the `frontend/my-auth/` directory and create a `.env` file:
```bash
cd frontend/my-auth
cp .env.example .env
```
Update the API URL if necessary:
```env
REACT_APP_API_URL="http://localhost:4000"
```

## 📂 Project Structure

```bash
visualize-algo/
├── frontend/my-auth/    # Frontend application (React, TS)
├── server/              # Backend application (NestJS)
├── .env.example         # Template for environment variables
└── README.md            # Project documentation
```

## 🚦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/visualize-algo.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm start
   ```

## 👥 Development Team
Developed by third-year Information Technology students at **Tay Nguyen University**.

| Role              | GitHub Profile                                                   |
| :-----------------| :--------------------------------------------------------------- |
| Database, Backend | [github.com/Chick25](https://github.com/Chick25)                 |
| Frontend, Design  | [github.com/tuancosac](https://github.com/tuancosac)             |
| Backend, Frontend | [github.com/faonnguyen-1402](https://github.com/faonnguyen-1402) |
| Frontend          | [github.com/kimoanh2005](https://github.com/kimoanh2005)         |
