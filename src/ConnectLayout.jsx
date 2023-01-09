import { Outlet } from "react-router-dom";
import Logo from "./components/Logo";

export default function ConnectLayout() {
  return (
    <div className="max-w-5xl h-full min-h-screen mx-auto p-4 flex">
      <main className="w-full max-w-[340px] mx-auto my-auto flex flex-col items-center">
        <Logo />
        <Outlet />
      </main>
    </div>
  );
}
