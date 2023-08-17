import { useState } from "react";
import { ViewDefinition } from "../Types";

interface ViewTabsProps {
  viewList: ViewDefinition[];
  setNewView: (view: ViewDefinition) => void;
}

const ViewTabs = ({ viewList, setNewView }: ViewTabsProps) => {
  const [view, setView] = useState<ViewDefinition>(viewList[0]);

  return (
    <div className="flex overflow-x-auto mb-3">
      {viewList.map((item, index) => (
        <div key={index} className="p-2">
          <button
            onClick={() => {
              setNewView(item);
              setView(item);
            }}
            className={
              view === item ? "text-white border-b-2" : "text-gray-400"
            }
          >
            {item.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewTabs;
