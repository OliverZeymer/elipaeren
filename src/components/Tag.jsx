import ComponentWrapper from "./ComponentWrapper";

export default function Tag({ children, className, text }) {
  className = className || "";

  return (
    <ComponentWrapper
      type="div"
      className={
        "px-5 py-2 rounded-3xl text-dark w-fit cursor-pointer " + className
      }
    >
      <p className="whitespace-nowrap">{text}</p>
    </ComponentWrapper>
  );
}
