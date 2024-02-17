import React from "react";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <div className="container mx-auto my-8 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <TodoApp />
    </div>
  );
}

export default App;
