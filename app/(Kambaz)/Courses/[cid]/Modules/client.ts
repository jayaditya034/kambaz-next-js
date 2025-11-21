// app/(Kambaz)/Courses/[cid]/Modules/client.ts
import axios from "axios";
import type { Module } from "./reducer";

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const MODULES_API = `${HTTP_SERVER}/api/modules`;

// ✅ update a module on the server
export const updateModule = async (module: Module): Promise<Module> => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data as Module;
};

// delete a module on the server
export const deleteModule = async (moduleId: string): Promise<void> => {
  await axios.delete(`${MODULES_API}/${moduleId}`);
};
