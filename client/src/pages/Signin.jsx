import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../api/auth";
import { useNavigate } from "react-router-dom";

import Input from "../components/ui/Input";

const Signin = ({ setUpdateApp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signin({ email, password });

      localStorage.setItem("accessToken", result.data.accessToken);

      setUpdateApp((prev) => !prev);

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center flex-col gap-10 w-screen h-screen bg-zinc-900">
      <h1 className="self-center font-['Poppins'] uppercase text-white text-4xl">
        Sign in
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col self-center">
        <Input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input type="submit" className="bg-rose-500 cursor-pointer" />
      </form>

      <Link
        to={"/signup"}
        className="self-center self-center text-white text-sm"
      >
        Don't have an account? <span className="text-rose-500">Sign up</span>
      </Link>
    </div>
  );
};

export default Signin;
