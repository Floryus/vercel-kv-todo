import { useEffect, useState } from "react";
import { TodoProps } from "../Types";
import { updateTodo } from "../kvStorage/UpdateTodo";
import Selector from "./Selector";

interface BlockTodoRowProps {
  todo: TodoProps;
  aspectName: string;
}

const BlockTodoRow = ({ todo, aspectName }: BlockTodoRowProps) => {
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedStatus, setEditedStatus] = useState(todo.status);
  const [editedAspect, setEditedAspect] = useState(
    todo[aspectName as keyof TodoProps]
  );

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
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        <input
          value={editedTitle}
          onBlur={updateTodoInKv}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="focus:border-transparent focus:outline-none w-full bg-gray-800 text-white resize-none"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        <input
          value={editedDescription}
          onBlur={updateTodoInKv}
          placeholder="Add description..."
          onChange={(e) => setEditedDescription(e.target.value)}
          className="focus:border-transparent focus:outline-none bg-gray-800 text-white resize-none w-full"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
        <input
          value={editedAspect}
          onBlur={updateTodoInKv}
          placeholder="Add aspect..."
          onChange={(e) => setEditedAspect(e.target.value)}
          className="focus:border-transparent focus:outline-none bg-gray-800 text-white resize-none w-full"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
      </td>
    </tr>
  );
};

export default BlockTodoRow;
