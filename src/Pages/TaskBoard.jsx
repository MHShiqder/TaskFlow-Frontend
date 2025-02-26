
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAuth } from "./AuthProvider";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

const categories = [
  { id: "todo", title: "To Do" },
  { id: "inProgress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export default function TaskBoard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    const newTasks = Array.from(tasks);
    const [removed] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, {
      ...removed,
      category: destination.droppableId,
    });

    setTasks(newTasks);

    try {
      await axios.put(`/api/tasks/${draggableId}`, {
        category: destination.droppableId,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      fetchTasks(); // Revert to server state on error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Task Board</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Droppable key={category.id} droppableId={category.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`task-column ${
                      snapshot.isDraggingOver ? "dragging-over" : ""
                    }`}
                  >
                    <h2 className="text-lg font-semibold mb-4">
                      {category.title}
                    </h2>
                    {tasks
                      .filter((task) => task.category === category.id)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`task-card ${
                                snapshot.isDragging ? "dragging" : ""
                              }`}
                            >
                              <h3 className="font-medium mb-2">{task.title}</h3>
                              {task.description && (
                                <p className="text-sm text-muted-foreground mb-3">
                                  {task.description}
                                </p>
                              )}
                              <div className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(task.timestamp), {
                                  addSuffix: true,
                                })}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
