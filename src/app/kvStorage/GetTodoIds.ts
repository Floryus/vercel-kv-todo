"use server";

import { kv } from "@vercel/kv";

export async function getTodoIds(userId: string) {
  try {
    const todos: string[] | null = await kv.lrange(`todos:${userId}`, 0, -1);
    if (todos === null) {
      console.log("No todos found for user: ", userId);
      return [];
    } else {
      console.log("Todos found for user: ", userId);
      return todos;
    }
  } catch (error) {
    // Handle errors
    console.log("Error: ", error);
  }
}
