import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

export default function Layout() {
  return (
    <div className="max-w-7xl sm:p-4 grid grid-cols-3 w-full mx-auto gap-[3%]">
      <Navigation />
      <main className="p-4 sm:p-0 w-full col-span-3 sm:grid-span-2 col-start-1 sm:col-start-2">
        <Outlet />
      </main>
    </div>
  );
}
