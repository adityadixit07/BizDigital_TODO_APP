import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : []; // if there are tasks in the local storage, return them, else return an empty array
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // useffect to store the task in the local storage and update the task list when the task is updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  // add the task when the enter key is pressed
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  // add task to the task list
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [{ title: newTask, completed: false }, ...tasks];
      setTasks(updatedTasks);
      setNewTask("");
      setFilter("all");
    }
  };

  // toggle task for completion
  const handleTaskToggle = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // delete task logic
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // clear all task
  const handleClearAllTasks = () => {
    setTasks([]);
  };

  // filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return task.completed;
    } else {
      return !task.completed;
    }
  });

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">To-Do List</h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full border rounded px-4 py-2"
          placeholder="Add a new task...."
          value={newTask}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />
      </div>
      <div className="mb-4 flex justify-center">
        <button
          onClick={handleAddTask}
          disabled={newTask.trim() === ""}
          className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 w-1/2 ${
            newTask.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Add Task
        </button>
        <select
          className="border rounded px-4 py-2 w-1/2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet.</p>
      ) : (
        <ul>
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between border-b py-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                  checked={task.completed}
                  onChange={() => handleTaskToggle(index)}
                />
                <span className={`${task.completed ? "line-through" : ""}`}>
                  {task.title}
                </span>
              </div>
              <button
                className="text-red-500 ml-2"
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}


{/* additional functionality */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleClearAllTasks}
          disabled={tasks.length === 0} //IF THERE ARE NO TASKS, THE BUTTON IS DISABLED
          className={`bg-red-500 text-white px-4 py-2 rounded w-full ${
            tasks.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Clear All Tasks
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
