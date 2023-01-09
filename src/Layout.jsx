import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="max-w-5xl p-4">
      {/* nav goes here */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
