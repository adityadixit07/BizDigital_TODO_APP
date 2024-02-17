// import React, { useState, useEffect } from "react";

// const TodoApp = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState("");
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem("tasks"));
//     if (storedTasks) {
//       setTasks(storedTasks);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const handleInputChange = (event) => {
//     setNewTask(event.target.value);
//   };

// //   const handleAddTask = () => {
// //     if (newTask.trim() !== "") {
// //       setTasks([{ title: newTask, completed: false }, ...tasks]);
// //       setNewTask("");
// //     }
// //   };
// const handleAddTask = () => {
//     if (newTask.trim() !== "") {
//         setTasks([{ title: newTask, completed: false }, ...tasks]);
//         setNewTask("");
//         setFilter("all");
//     }
// };

//   const handleTaskToggle = (index) => {
//     const updatedTasks = [...tasks];
//     updatedTasks[index].completed = !updatedTasks[index].completed;
//     setTasks(updatedTasks);
//   };

//   const handleDeleteTask = (index) => {
//     const updatedTasks = [...tasks];
//     updatedTasks.splice(index, 1);
//     setTasks(updatedTasks);
//   };

//   const filteredTasks = tasks.filter((task) => {
//     if (filter === "all") {
//       return true;
//     } else if (filter === "completed") {
//       return task.completed;
//     } else {
//       return !task.completed;
//     }
//   });

//   return (
//     <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold mb-6 text-center">To-Do List</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           className="w-full border rounded px-4 py-2"
//           placeholder="Enter task"
//           value={newTask}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div className="mb-4 flex justify-center">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded mr-2 w-1/2"
//           onClick={handleAddTask}
//         >
//           Add Task
//         </button>
//         <select
//           className="border rounded px-4 py-2 w-1/2"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="completed">Completed</option>
//           <option value="incomplete">Incomplete</option>
//         </select>
//       </div>
//       <ul>
//         {filteredTasks.map((task, index) => (
//           <li
//             key={index}
//             className="flex items-center justify-between border-b py-2"
//           >
//             <span
//               className={`flex-1 ${task.completed ? "line-through" : ""}`}
//               onClick={() => handleTaskToggle(index)}
//             >
//               {task.title}
//             </span>
//             <div>
//               <button
//                 className="text-red-500 mr-2"
//                 onClick={() => handleDeleteTask(index)}
//               >
//                 Delete
//               </button>
//               <input
//                 type="checkbox"
//                 className="form-checkbox h-5 w-5 text-blue-600"
//                 checked={task.completed}
//                 onChange={() => handleTaskToggle(index)}
//               />
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoApp;

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // retrieve the tasks from the local storage when the component mounts
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  //   add the task to the tasks array
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [{ title: newTask, completed: false }, ...tasks];
      setTasks(updatedTasks);
      toast.success("Task added successfully");
      setNewTask("");
      // Set the filter to itsall value every time a new task is added
      setFilter(filter);
    }
  };

  //   task toggle function to update the completed property of the task
  const handleTaskToggle = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  //   delete the task from the tasks array
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    toast.error("Task deleted successfully");
    setTasks(updatedTasks);
  };

  //   filter the tasks based on the filter value completed, incomplete or all
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
          placeholder="Enter task"
          value={newTask}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4 flex justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 w-1/2"
          onClick={handleAddTask}
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
      <ul>
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center justify-between border-b py-2"
          >
            <span
              className={`flex-1 ${task.completed ? "line-through" : ""}`}
              onClick={() => handleTaskToggle(index)}
            >
              {task.title}
            </span>
            <div>
              <button
                className="text-red-500 mr-2"
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={task.completed}
                onChange={() => handleTaskToggle(index)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
