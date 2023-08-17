import * as React from "react";

interface SelectorProps {
  open: boolean;
  trigger: React.ReactNode;
  menu: React.ReactNode[];
}

const Selector = ({ open, trigger, menu }: SelectorProps) => {
  return (
    <div className="">
      {trigger}
      {open ? (
        <ul className="absolute z-10 list-none bg-gray-700 rounded-md mb-1 p-1 w-32">
          {menu.map((menuItem, index) => (
            <li
              key={index}
              className="bg-gray-600 hover:bg-gray-100 p-2 rounded-md mb-1"
            >
              {menuItem}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Selector;
