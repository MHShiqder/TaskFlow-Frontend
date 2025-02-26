// src/components/TaskList.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Task from "./Task";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimation,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { AuthContext } from "../Provider/AuthProvider";

const TaskList = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://task-flow-backend-seven.vercel.app/tasks?userId=${user.uid}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [user.uid]);

  // Handle drag start
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveTask(tasks.find((task) => task._id === active.id));
  };

  // Handle drag end
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task._id === active.id);
        const newIndex = tasks.findIndex((task) => task._id === over.id);

        // Reorder tasks
        const updatedTasks = arrayMove(tasks, oldIndex, newIndex);

        // Update task order in the backend
        axios.put(`https://task-flow-backend-seven.vercel.app/tasks/${active.id}`, {
          order: newIndex,
        });

        return updatedTasks;
      });
    }

    // Reset active task
    setActiveTask(null);
  };

  // Handle drag over (moving between categories)
  const handleDragOver = async (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const activeTask = tasks.find((task) => task._id === active.id);
      const overTask = tasks.find((task) => task._id === over.id);

      if (activeTask.category !== overTask.category) {
        // Update task category in the backend
        await axios.put(`https://task-flow-backend-seven.vercel.app/tasks/${active.id}`, {
          category: overTask.category,
        });

        // Update task category in the state
        setTasks((tasks) =>
          tasks.map((task) =>
            task._id === active.id
              ? { ...task, category: overTask.category }
              : task
          )
        );
      }
    }
  };

  // Sensors for drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Group tasks by category
  const groupedTasks = {
    "To-Do": tasks.filter((task) => task.category === "To-Do"),
    "In Progress": tasks.filter((task) => task.category === "In Progress"),
    Done: tasks.filter((task) => task.category === "Done"),
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {Object.entries(groupedTasks).map(([category, tasks]) => (
          <div key={category} className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">{category}</h2>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
              {tasks.map((task) => (
                <Task key={task._id} task={task} />
              ))}
            </SortableContext>
          </div>
        ))}
      </div>
      <DragOverlay dropAnimation={defaultDropAnimation}>
        {activeTask ? (
          <Task task={activeTask} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskList;