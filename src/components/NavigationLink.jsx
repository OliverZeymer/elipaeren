import { NavLink } from "react-router-dom"

export default function NavigationLink({ path, children }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "flex text-xl w-full rounded-2xl p-4 bg-primary text-black font-semibold"
          : "flex text-xl w-full rounded-2xl p-4 bg-black text-white font-medium"
      }>
      {children}
    </NavLink>
  )
}
