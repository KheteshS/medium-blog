import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlodCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  id,
  authorName,
  content,
  publishedDate,
  title,
}: BlodCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex gap-2">
          <Avatar name={authorName} />
          <div className="font-extralight text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="">&#128900;</div>
          <div className=" font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-base font-thin">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
        {/* <div className="bg-slate-200 h-1 w-full"></div> */}
      </div>
    </Link>
  );
};
