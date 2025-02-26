// src/components/TaskForm.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const TaskForm = () => {
    const { user } = useContext(AuthContext)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("To-Do");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const task = {
            title,
            description,
            category,
            userId: user.uid
        }
        await axios.post("https://task-flow-backend-seven.vercel.app/tasks", task);
        window.location.reload(); // Refresh the page to reflect changes
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
            >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <button type="submit" className="bg-green-500 btn text-white px-4 py-2 rounded">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;