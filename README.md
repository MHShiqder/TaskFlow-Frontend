# TaskFlow - Task Management Application (Frontend)

TaskFlow is a modern, responsive task management application that allows users to create, edit, delete, and reorder tasks across three categories: **To-Do**, **In Progress**, and **Done**. The app features a clean and minimalistic UI, drag-and-drop functionality, and real-time updates. It is built using **Vite + React** for the frontend and integrates with a backend API for task persistence.

---

## Live Link
- **Frontend**: [https://taskflow49.netlify.app/](https://taskflow49.netlify.app/)

---

## Dependencies
The project uses the following dependencies:

### Core Dependencies
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web development.
- **Tailwind CSS**: A utility-first CSS framework for styling.

### Additional Libraries
- **@dnd-kit/core**: A lightweight, modular library for drag-and-drop functionality.
- **@dnd-kit/sortable**: Utilities for building sortable interfaces with drag-and-drop.
- **axios**: A promise-based HTTP client for making API requests.
- **react-router-dom**: A library for routing in React applications.
- **firebase**: For user authentication (Google Sign-In).

---

## Installation Steps
Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/taskflow-frontend.git
   cd taskflow-frontend

2. **Install Dependencies**:

```bash
npm install
```
3. **Configure Environment Variables**:

Create a `.env` file in the root directory and add the necessary environment variables based on the project's requirements.


4. **Start the Development Server**:

Run the following command to start the application:

```bash
npm run dev
```

The project should now be running locally. Open your browser and visit:

```
http://localhost:5000
```

## Additional Notes

- Ensure that any required backend services or APIs are running and correctly configured.
- If you encounter any issues, refer to the project's GitHub repository for further guidance.


## Technologies Used
The following technologies were used to build this project:

### Frontend
- **React**: For building the user interface.
- **Vite**: For fast development and bundling.
- **Tailwind CSS**: For styling the application.
- **@dnd-kit**: For drag-and-drop functionality.
- **axios**: For making HTTP requests to the backend API.
- **Firebase Authentication**: For user authentication (Google Sign-In).

## Features

### Task Management:
- Add, edit, and delete tasks.
- Drag-and-drop tasks to reorder them within a category or move them between categories.

### Real-Time Updates:
- Changes are instantly saved to the database and reflected in the UI.

### Responsive Design:
- Works seamlessly on both desktop and mobile devices.

### User Authentication:
- Secure login using Firebase Authentication (Google Sign-In).

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.



