import { Link } from "react-router-dom";

export const AuthHeader = ({ type }: { type: "signup" | "signin" }) => {
  return (
    <div className="heading px-12">
      <div className="text-3xl font-extrabold text-center">
        {type === "signin" ? "Sign In to account" : "Create an account"}
      </div>
      <div className="text-base text-center text-slate-500">
        {type === "signin"
          ? "Don't have an account"
          : "Already have an account"}
        ?
        <Link
          className="pl-2 underline"
          to={type === "signin" ? "/signup" : "/signin"}
        >
          {type === "signin" ? "Sign up" : "Sign in"}
        </Link>
      </div>
    </div>
  );
};
