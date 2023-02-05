import { post, patch, get } from "./index";

export const createServer = (formData) => post("/api/servers", formData);
export const getServers = () => get("/api/servers");
export const getServer = (id) => get("/api/servers/" + id);
