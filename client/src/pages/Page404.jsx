import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="flex justify-center w-screen h-screen bg-zinc-900">
      <div className="flex flex-col self-center">
        <h1 className="self-center font-['Poppins'] uppercase text-white text-9xl">
          404
        </h1>
        <h2 className="self-center font-['Poppins'] uppercase text-white text-2xl">
          It looks like you're lost
        </h2>

        <Link className="text-rose-500 self-center" to="/">
          Let's go home
        </Link>
      </div>
    </div>
  );
};

export default Page404;
