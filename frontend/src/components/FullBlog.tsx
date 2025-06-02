import type { Blog } from "../hooks";
import { Avatar } from "./Avatar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-7xl">
        <div className="col-span-8 ">
          <div className="text-5xl font-extrabold">{blog?.title}</div>
          <div className="text-slate-500 pt-2">Posted on {`someday`}</div>
          <div className="pt-4">{blog?.content}</div>
        </div>
        <div className="col-span-4 ">
          <div className="text-slate-600 text-lg">Author</div>
          <div className="flex gap-2">
            <div className="flex flex-col justify-center">
              <Avatar size="big" name={blog.author.name || "Anonymous"} />
            </div>
            <div className="">
              <div className="text-2xl font-bold">
                {blog.author.name || "Anonymous"}
              </div>
              <div className="pt-2">
                Random catch phrase about the author's ability to grab the user
                attention
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
