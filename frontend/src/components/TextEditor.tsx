import type { ChangeEvent } from "react";

export const TextEditor = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="mt-2 bg-gray-50 ">
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between border rounded-lg border-gray-300">
          <div className="my-2  w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              id="editor"
              onChange={onChange}
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 border-0 pl-2"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
