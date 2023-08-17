"use client";

import { useEffect, useState, useTransition } from "react";
import { addTodo } from "./kvStorage/AddTodo";
import { getTodoIds } from "./kvStorage/GetTodoIds";
import { getTodo } from "./kvStorage/GetTodo";
import TodoPanel from "./components/TodoPanel";
import ViewTabs from "./components/ViewTabs";
import getTodoPlaceholder from "./resources/TodoPlaceholder";
import { TodoProps, ViewDefinition } from "./Types";
import BlockView from "./components/BlockView";

//TODO: implement user views via DB
const views: ViewDefinition[] = [
  { name: "Block", aspect: "title", type: "Block" },
  { name: "Column", aspect: "title", type: "Column" },
  { name: "Matrix", aspect: "ghgh", type: "Matrix" },
];

export default function Home() {
  // TODO: create user logic
  const userId = "user1";

  const [placeholder, setPlaceholder] = useState(getTodoPlaceholder());
  const [todoText, setTodoText] = useState("");

  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [todosWithoutAspect, setTodosWithoutAspect] = useState<TodoProps[]>([]);
  const [currTodoIds, setCurrTodoIds] = useState<string[]>([]);

  const [aspect, setAspect] = useState<string>("title");
  const [viewType, setViewType] = useState<String>(views[0].name);

  async function changeView(newView: ViewDefinition) {
    setViewType(newView.type);
    setAspect(newView.aspect);
    console.log(newView);
    // calculate which todos are in the view and which are on the side panel
    setTodosWithoutAspect(todos.filter((todo) => !todo[newView.aspect]));
  }

  useEffect(() => {
    updateTodos();
  }, []);

  async function updateTodos() {
    const todoIds = await getTodoIds(userId);
    if (todoIds) {
      const newTodoIds = todoIds.filter(
        (todo) => currTodoIds.indexOf(todo) === -1
      );

      const newTodos: any[] = await Promise.all(
        newTodoIds.map(async (todo) => {
          const t = await getTodo(userId, todo);
          return t;
        })
      );

      setCurrTodoIds([...currTodoIds, ...newTodoIds]);
      setTodos([...todos, ...newTodos]);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoText.trim() !== "") {
      addTodo(userId, todoText);
      setTodoText("");
      updateTodos();
      setPlaceholder(getTodoPlaceholder());
    }
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-12 w-full">
      <div className="w-full bg-gray-800 rounded-md p-4">
        <div className="flex flex-grow">
          <div className="w-1/4 border-white border-opacity-20 focus:outline-none focus:border-opacity-40">
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-800 rounded-md  flex items-center shadow-md hover:shadow-lg mb-3">
                <input
                  type="text"
                  placeholder={placeholder}
                  value={todoText}
                  onChange={(e) => setTodoText(e.target.value)}
                  className="bg-gray-800 text-white flex-grow p-2 pr-0 rounded-l-md border-2 border-white border-opacity-20 focus:outline-none focus:border-opacity-40"
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-white bg-rose-600 p-2 rounded-r-md hover:bg-rose-700 focus:outline-none focus:bg-rose-700 border-t-2 border-b-2 border-r-2 border-white border-opacity-20 items-center"
                >
                  Add
                </button>
              </div>
            </form>
            {/* TODO list */}

            {todosWithoutAspect.length > 0 ? (
              todosWithoutAspect.map((todo, index) => (
                <TodoPanel key={index} todo={todo} />
              ))
            ) : (
              <div className="w-full flex justify-center items-center text-gray-400 p-4">
                This view contains all todos.
              </div>
            )}
          </div>
          <div className="w-3/4 px-4">
            {/* TODO details */}
            <ViewTabs viewList={views} setNewView={changeView} />
            {/* Add components for different type if tabs */}
            {viewType === "Block" ? (
              <BlockView todos={todos} aspect={aspect} />
            ) : null}
            {viewType === "Column" ? <div>Column</div> : null}
            {viewType === "Matrix" ? <div>Matrix</div> : null}
          </div>
        </div>
      </div>
    </main>
  );
}
