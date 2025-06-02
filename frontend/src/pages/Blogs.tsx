import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <div className="">
      <Appbar />
      {loading ? (
        <div role="status" className="animate-pulse ">
          Loading...
        </div>
      ) : (
        <div className="flex justify-center">
          <div>
            {blogs.map((blog) => (
              <BlogCard
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"Published date"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
