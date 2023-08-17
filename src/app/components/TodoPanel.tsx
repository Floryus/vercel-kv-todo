import React, { useEffect, useState } from "react";
import { updateTodo } from "../kvStorage/UpdateTodo";
import Selector from "./Selector";
import { TodoProps } from "../Types";

interface TodoPanelProps {
  todo: TodoProps;
}

const TodoPanel: React.FC<TodoPanelProps> = ({ todo }) => {
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedStatus, setEditedStatus] = useState(todo.status);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    updateTodoInKv();
  }, [editedStatus]);

  async function handleStatusChange(
    status: "Complete" | "Incomplete" | "Hold"
  ) {
    setEditedStatus(status);
    handleOpen();
  }

  function updateTodoInKv() {
    if (
      editedTitle !== todo.title ||
      editedDescription !== todo.description ||
      editedStatus !== todo.status
    ) {
      todo.title = editedTitle;
      todo.description = editedDescription;
      todo.status = editedStatus;
      updateTodo(todo);
    }
  }

  return (
    <div className="grid gap-4 border-2 border-white border-opacity-20 focus:outline-none focus:border-opacity-40 p-4 rounded-md shadow-md mb-4">
      <div>
        <input
          value={editedTitle}
          onBlur={updateTodoInKv}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="focus:border-transparent focus:outline-none w-full font-bold text-xl bg-gray-800 text-white resize-none w-full"
        />
        <input
          value={editedDescription}
          onBlur={updateTodoInKv}
          placeholder="Click to edit..."
          onChange={(e) => setEditedDescription(e.target.value)}
          className="focus:border-transparent focus:outline-none bg-gray-800 text-white resize-none w-full"
        />
      </div>
      <div className="w-32">
        <Selector
          open={open}
          trigger={
            <button
              className="w-fit rounded-md px-4 py-2  bg-gray-600 hover:bg-gray-700 focus:outline-none"
              onClick={handleOpen}
            >
              {editedStatus === "Complete" ? (
                <div className="text-green-300">{editedStatus}</div>
              ) : editedStatus === "Incomplete" ? (
                <div className="text-orange-300">{editedStatus}</div>
              ) : (
                <div className="text-red-500">{editedStatus}</div>
              )}
            </button>
          }
          menu={[
            <button
              className={"text-green-300 w-full"}
              onClick={() => handleStatusChange("Complete")}
            >
              Complete
            </button>,
            <button
              className="text-orange-300 w-full"
              onClick={() => handleStatusChange("Incomplete")}
            >
              Incomplete
            </button>,
            <button
              className="text-red-500 w-full"
              onClick={() => handleStatusChange("Hold")}
            >
              Hold
            </button>,
          ]}
        />
      </div>
    </div>
  );
};

export default TodoPanel;
