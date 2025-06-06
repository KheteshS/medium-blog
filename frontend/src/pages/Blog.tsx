import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: "" + id || "",
  });

  return (
    <div className="flex flex-col h-screen">
      <Appbar />
      {loading ? (
        <div className="h-full flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      ) : (
        <FullBlog blog={blog} />
      )}
    </div>
  );
};
