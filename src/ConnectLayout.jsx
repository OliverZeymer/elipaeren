import { Outlet } from "react-router-dom"
import Logo from "./components/Logo"

export default function ConnectLayout(props) {
  const { children } = props
  console.log(children)
  return (
    <div className="max-w-5xl h-full min-h-screen mx-auto p-2 flex">
      <main className="w-full max-w-[340px] mx-auto my-auto flex flex-col items-center">
        <Logo className="mb-6" />
        {children && children}
        <Outlet />
      </main>
    </div>
  )
}
