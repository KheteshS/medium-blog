export const Avatar = ({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center border-2 ${
        size === "small" ? "w-6 h-6" : "w-8 h-8 hover:border-slate-400"
      }  border-transparent overflow-hidden bg-gray-100 rounded-full `}
    >
      <span
        className={`${
          size === "small"
            ? "text-xs font-extralight"
            : "text-base font-semibold"
        } text-xs text-gray-600  `}
      >
        {name[0]}
      </span>
    </div>
  );
};
