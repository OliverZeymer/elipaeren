import Heading from "./Heading";

export default function Logo(props) {
  const { className } = props;

  const extraClasses = className ? className : "";

  return (
    <div className={"w-[100px] flex flex-col items-center " + extraClasses}>
      <img className="mb-1" src="icon.png" />
      <Heading h1>
        El<span className="text-primary">i</span>pæren
      </Heading>
    </div>
  );
}
