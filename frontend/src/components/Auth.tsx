import type { SigninInput, SignupInput } from "@khetesh/medium-common";
import { useState } from "react";
import { AuthHeader } from "./AuthHeader";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { LabelledInput } from "./LabelledInput";

// trpc : IMPORTANT
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [signupInputs, setSignupInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const [signinInputs, setSigninInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function updateState(
    type: "signin" | "signup",
    label: "name" | "username" | "password",
    value: string
  ) {
    if (type === "signin") {
      if (label === "username") {
        setSigninInputs({
          ...signinInputs,
          email: value,
        });
      } else if (label === "password") {
        setSigninInputs({
          ...signinInputs,
          password: value,
        });
      }
    } else {
      if (label === "username") {
        setSignupInputs({
          ...signupInputs,
          email: value,
        });
      } else if (label === "password") {
        setSignupInputs({
          ...signupInputs,
          password: value,
        });
      } else if (label === "name") {
        setSignupInputs({
          ...signupInputs,
          name: value,
        });
      }
    }
  }

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        type === "signin" ? signinInputs : signupInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing up!");
    }
  }

  return (
    <>
      <div className="h-screen flex justify-center ">
        <div className="flex flex-col justify-center">
          <AuthHeader type={type} />

          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Enter your username"
                onChange={(e) => updateState(type, "name", e.target.value)}
              />
            ) : null}

            <LabelledInput
              label="Email"
              placeholder="Enter your email"
              onChange={(e) => updateState(type, "username", e.target.value)}
            />

            <LabelledInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => updateState(type, "password", e.target.value)}
            />

            <button
              type="button"
              onClick={sendRequest}
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              {type === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
