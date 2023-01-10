import Button from "./Button"
import ComponentWrapper from "./ComponentWrapper"
import Logo from "./Logo"
import NavigationLink from "./NavigationLink"

const navigationLinks = [
  { path: "/", name: "Home" },
  { path: "/lights", name: "Lights" },
  { path: "/rooms", name: "Rooms" },
]

export default function Navigation() {
  return (
    <ComponentWrapper
      type="nav"
      className="z-50 flex-row rounded-3xl fixed bottom-0 flex select-none sm:static sm:flex w-screen bg-lighter sm:p-6 sm:max-w-xs sm:flex-col sm:h-[97vh]">
      <Logo className="mx-auto mb-12" />
      <ul className="flex sm:gap-6 sm:flex-col sm:h-full">
        {navigationLinks.map((link) => (
          <li key={link.path}>
            <NavigationLink path={link.path}>{link.name}</NavigationLink>
          </li>
        ))}
      </ul>
      <Button text="Show Tutorial" className="hidden sm:block bg-black text-xl !p-4 text-left" />
    </ComponentWrapper>
  )
}
