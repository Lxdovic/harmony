import { post, get } from "./index";

export const signup = (formData) => post("/api/users/register", formData);
export const signin = (formData) => post("/api/users/login", formData);
export const whoami = () => get("/api/users/whoami");
