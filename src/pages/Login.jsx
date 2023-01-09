import ComponentWrapper from "../components/ComponentWrapper";
import Button from "../components/Button";

export default function Login() {
  return (
    <div className="flex flex-col">
      <ComponentWrapper
        type="div"
        className="bg-lighter p-7 rounded-3xl max-w-[340px] w-full"
      >
        <p className="mb-5">
          Make sure your bridge is{" "}
          <span className="font-medium">powered on</span> and{" "}
          <span className="font-medium">ethernet plugged in.</span>
        </p>
        <p className="mb-5">
          Now <span className="text-primary">press the bridge button</span> and{" "}
          <span className="text-primary">make sure blue light blinks.</span>
        </p>
        <p>Well done, continue.</p>
      </ComponentWrapper>
      <Button className="bg-primary text-dark mt-2 ml-auto" text="Continue" />
    </div>
  );
}
