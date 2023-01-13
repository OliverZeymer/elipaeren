import { Outlet } from "react-router-dom"
import Navigation from "./components/Navigation"
import { motion } from "framer-motion"

export default function Layout() {
  return (
    <div className="max-w-7xl sm:p-4 grid grid-cols-3 w-full mx-auto gap-[3%] overflow-clip">
      <Navigation />
      <motion.main
        initial={{ x: "100%", y: 0, opacity: 1 }}
        animate={{ x: 0, y: 0, opacity: 1, filter: "blur(0)" }}
        exit={{ y: "100%", x: 0, opacity: 0, filter: "blur(18px)" }}
        transition={{
          duration: 0.25,
        }}
        className="p-4 sm:p-8 pb-28 w-full col-span-3 sm:grid-span-2 col-start-1 sm:col-start-2 sm:mb-0 bg-lighter sm:rounded-3xl">
        <Outlet />
      </motion.main>
    </div>
  )
}
