import { NavLink } from "react-router-dom"

export default function NavigationLink({ path, children }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "flex text-xl w-full rounded-2xl sm:p-4 text-primary  sm:bg-primary sm:text-black font-semibold transition-all"
          : "flex text-xl w-full rounded-2xl sm:p-4 sm:bg-black text-white font-medium sm:hover:bg-black/50 transition-all"
      }>
      {children}
    </NavLink>
  )
}
