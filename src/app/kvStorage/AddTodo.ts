"use server";

import { kv } from "@vercel/kv";

export async function addTodo(userId: string, todoText: string) {
  const todoId = Date.now().toString();
  try {
    await kv.lpush(`todos:${userId}`, todoId);
    await kv.hmset(`todo:${userId}${todoId}`, {
      title: todoText,
      description: "",
      status: "Incomplete",
      id: `${userId}${todoId}`,
    });
  } catch (error) {
    // Handle errors
    console.log("Error: ", error);
  }
}
