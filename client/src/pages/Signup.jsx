import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { whoami } from "../api/auth";

import Input from "../components/ui/Input";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <div className="flex justify-center flex-col gap-10 w-screen h-screen bg-zinc-900">
      <h1 className="self-center font-['Poppins'] uppercase text-white text-4xl">
        Sign up
      </h1>
      <form className="flex flex-col self-center">
        <Input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          value={passwordConfirm}
          placeholder="Confirm password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Input type="submit" className="bg-rose-500 cursor-pointer" />
      </form>

      <Link
        to={"/signin"}
        className="self-center self-center text-white text-sm"
      >
        Already have an account? <span className="text-rose-500">Sign in</span>
      </Link>
    </div>
  );
};

export default Signup;
