import { useEffect, useState } from "react";
import { TodoProps } from "../Types";
import BlockTodoRow from "./BlockTodoRow";

interface BlockViewProps {
  todos: TodoProps[];
  aspect: string;
}

const dAV: string[] = [];
const BlockView = ({ todos, aspect }: BlockViewProps) => {
  //TODO: implement better sorting
  todos = todos.sort();

  const [differentAspectValues, setDifferentAspectValues] =
    useState<string[]>(dAV);
  useEffect(() => {
    todos.forEach((todo) => {
      if (
        differentAspectValues.indexOf(todo[aspect as keyof TodoProps]) === -1
      ) {
        dAV.push(todo[aspect as keyof TodoProps]);
        setDifferentAspectValues([...dAV]);
      }
    });
  }, [todos]);

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              {/* Create the different seperators */}
              {differentAspectValues.map((value, index) => {
                return (
                  <>
                    <thead key={index}>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase"
                        >
                          {value}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {todos.map((todo, index) => {
                        if (todo[aspect as keyof TodoProps] === value) {
                          return (
                            <BlockTodoRow
                              key={index + "btr"}
                              todo={todo}
                              aspectName={aspect}
                            />
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockView;
