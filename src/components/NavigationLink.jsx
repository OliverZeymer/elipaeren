import { NavLink } from "react-router-dom"

export default function NavigationLink({ path, children }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "flex text-xl w-full rounded-2xl sm:p-4 text-primary  sm:bg-primary sm:text-black font-semibold"
          : "flex text-xl w-full rounded-2xl sm:p-4 sm:bg-black text-white font-medium"
      }>
      {children}
    </NavLink>
  )
}
