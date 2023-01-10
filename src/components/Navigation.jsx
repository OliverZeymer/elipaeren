import Button from "./Button"
import ComponentWrapper from "./ComponentWrapper"
import Logo from "./Logo"
import NavigationLink from "./NavigationLink"
import { BsViewList, BsLightbulb, BsFillHouseFill } from "react-icons/bs"
const navigationLinks = [
  { path: "/", name: "Home", icon: BsViewList },
  { path: "/lights", name: "Lights", icon: BsLightbulb },
  { path: "/rooms", name: "Rooms", icon: BsFillHouseFill },
]

export default function Navigation() {
  return (
    <ComponentWrapper
      type="nav"
      className="z-50 flex-row rounded-full sm:rounded-3xl justify-center fixed w-full p-2 items-center bottom-0 flex select-none sm:static sm:flex sm:bg-lighter sm:p-6 sm:min-w-fit sm:max-w-xs sm:flex-col sm:h-[96.5vh]">
      <Logo className="mx-auto mb-12 hidden sm:flex" />
      <ul className="flex gap-8  justify-center rounded-3xl sm:justify-start w-full mx-auto bg-lighter sm:gap-6 sm:flex-col sm:h-full">
        {navigationLinks.map((link) => (
          <li key={link.path}>
            <NavigationLink path={link.path}>
              <link.icon className="inline-block my-3 sm:my-0 sm:mr-4 sm:text-2xl text-4xl" />
              <p className="hidden sm:block">{link.name}</p>
            </NavigationLink>
          </li>
        ))}
      </ul>
      <Button text="Show Tutorial" className="hidden w-full sm:block bg-black text-xl !p-4 text-left" />
    </ComponentWrapper>
  )
}
