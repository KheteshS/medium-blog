import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { TextEditor } from "../components/TextEditor";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div className="">
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="w-full max-w-5xl">
          <input
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextEditor onChange={(e) => setDescription(e.target.value)} />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content: description,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};
