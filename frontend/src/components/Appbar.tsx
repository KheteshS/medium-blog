import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export const Appbar = () => {
  return (
    <div className="border-b border-slate-400 flex justify-between px-10 py-4">
      <Link to={"/"} className="flex flex-col justify-center font-bold">
        Medium
      </Link>
      <div className="">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-4 "
          >
            New
          </button>
        </Link>
        <Avatar name="Khetesh" size="big" />
      </div>
    </div>
  );
};
