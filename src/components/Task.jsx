// src/components/Task.jsx
import React, { useState } from "react";
import axios from "axios";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  // Make the task sortable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Handle the update action
  const handleUpdate = async () => {
    const updatedTask = {
      title,
      description,
      category: task.category,
    };

    try {
      await axios.put(`https://task-flow-backend-seven.vercel.app/tasks/${task._id}`, updatedTask);
      setIsEditing(false);
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle the delete action
  const handleDelete = async () => {
    try {
      await axios.delete(`https://task-flow-backend-seven.vercel.app/tasks/${task._id}`);
      window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 mb-4 rounded-lg shadow-md"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-move flex justify-center bg-gray-300 p-2 mb-2"
      >
        <span>Drag me</span>
      </div>

      {/* Task content */}
      {isEditing ? (
        // Edit mode
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 btn text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 btn text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        // View mode
        <>
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <div className="mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 btn text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 btn text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;