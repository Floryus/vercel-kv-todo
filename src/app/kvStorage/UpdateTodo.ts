"use server";

import { kv } from "@vercel/kv";
import { TodoProps } from "../Types";

export async function updateTodo(todo: TodoProps) {
  console.log("Updating todo: ", todo.title, todo.description, todo.status);
  try {
    await kv.hmset(`todo:${todo.id}`, {
      title: todo.title,
      description: todo.description,
      status: todo.status,
    });
    console.log("Todo updated: ", todo.title);
  } catch (error) {
    // Handle errors
    console.log("Error: ", error);
  }
}
