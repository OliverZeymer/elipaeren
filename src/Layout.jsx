import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

export default function Layout() {
  return (
    <div className="max-w-7xl p-4 flex mx-auto w-full sm:gap-16">
      <Navigation />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
