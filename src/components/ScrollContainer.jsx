export default function ScrollContainer({ children, className }) {
  className = className || "";

  return (
    <div
      className={"flex gap-1 overflow-x-scroll w-full max-w-full " + className}
    >
      {children}
    </div>
  );
}
