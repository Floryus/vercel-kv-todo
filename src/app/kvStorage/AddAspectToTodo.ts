import { kv } from "@vercel/kv";
import { TodoProps } from "../Types";

export async function addAspectToTodo(
  todo: TodoProps,
  aspect: string,
  value: string
) {
  try {
    await kv.hmset(`todo:${todo.id}`, {
      [aspect]: value,
    });
  } catch (error) {
    // Handle errors
    console.log("Error: ", error);
  }
}
