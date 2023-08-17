export interface TodoProps {
  id: string;
  title: string;
  description: string;
  status: "Complete" | "Incomplete" | "Hold";
  [key: string]: any;
}

export interface ViewDefinition {
  name: string;
  aspect: string;
  type: "Block" | "Column" | "Matrix";
}
