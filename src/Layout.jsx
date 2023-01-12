import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { motion } from "framer-motion";

export default function Layout() {
  return (
    <div className="max-w-7xl sm:p-4 grid grid-cols-3 w-full mx-auto gap-[3%]">
      <Navigation />
      <motion.main
        initial={{ y: "50%", opacity: 0.5, scale: 0.9 }}
        animate={{ y: "0%", opacity: 1, scale: 1 }}
        exit={{ y: "-50%", opacity: 0.5, scale: 0.9 }}
        transition={{ duration: 0.125 }}
        className="p-4 sm:p-8 w-full col-span-3 sm:grid-span-2 col-start-1 sm:col-start-2 sm:mb-0 bg-lighter sm:rounded-3xl"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}
