import ComponentWrapper from "../components/ComponentWrapper";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col max-w-[340px] w-full">
      <ComponentWrapper
        type="div"
        className="bg-lighter p-7 rounded-3xl max-w-[340px] w-full"
      >
        <p className="text-2xl font-medium text-red mb-3">404</p>
        <p>Page not found, what are you trying bruw?</p>
      </ComponentWrapper>
      <Button
        className="bg-primary text-dark mt-2 ml-auto"
        text="Go Home"
        onClick={() => navigate("/")}
      />
    </div>
  );
}
