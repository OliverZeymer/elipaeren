import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

export default function Layout() {
  return (
    <div className="max-w-7xl sm:p-4 flex relative w-full sm:gap-16">
      <Navigation />
      <main className="p-4 sm:p-0 w-full">
        <Outlet />
      </main>
    </div>
  );
}
