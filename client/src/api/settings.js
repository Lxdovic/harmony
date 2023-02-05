import { post, patch } from "./index";
import axios from "axios";

// this one does not work no idea why
// export const updateProfile = (formData) => post("/api/users", formData);
export const updateProfile = (formData) =>
  axios.post("http://localhost:3000/api/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
