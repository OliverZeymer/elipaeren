export default function ScrollContainer({ children, className }) {
  className = className || "";

  return <div className={"overflow-x-scroll " + className}>{children}</div>;
}
