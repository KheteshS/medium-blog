import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: "" + id || "",
  });

  return (
    <>
      <Appbar />
      {loading ? (
        <div role="status" className="animate-pulse ">
          Loading...
        </div>
      ) : (
        <FullBlog blog={blog} />
      )}
    </>
  );
};
