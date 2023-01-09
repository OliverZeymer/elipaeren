import ComponentWrapper from "../components/ComponentWrapper";
import Button from "../components/Button";

export default function Connect() {
  return (
    <div>
      <ComponentWrapper
        type="div"
        className="bg-lighter p-7 rounded-3xl max-w-[340px] w-full"
      >
        <p className="font-medium text-red mb-3">
          Before using this app you must connect your bridge-system.
        </p>
        <p>Luckily, it is very simple!</p>
      </ComponentWrapper>
      <Button className="bg-primary text-dark" text="Continue" />
    </div>
  );
}
