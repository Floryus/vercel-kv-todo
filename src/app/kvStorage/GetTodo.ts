"use server";

import { kv } from "@vercel/kv";

export async function getTodo(userId: string, todoId: string) {
  try {
    let todo = await kv.hmget(
      `todo:${userId}${todoId}`,
      "title",
      "description",
      "status"
    );
    if (todo === null) {
      console.log("No todo found for id: ", todoId);
      return "";
    } else {
      console.log("Todo found for id: ", todoId);
      todo = {
        ...todo,
        id: `${userId}${todoId}`,
      };
      return todo;
    }
  } catch (error) {
    // Handle errors
    console.log("Error: ", error);
  }
}
