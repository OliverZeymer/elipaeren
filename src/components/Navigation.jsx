import Button from "./Button";
import ComponentWrapper from "./ComponentWrapper";
import Logo from "./Logo";
import NavigationLink from "./NavigationLink";
import {
  BsDoorOpen,
  BsLightbulb,
  BsFillHouseFill,
  BsBoxArrowLeft,
} from "react-icons/bs";
import TokenContext from "../contexts/TokenContext";
import { useContext } from "react";
import { setCookie } from "react-use-cookie";

export default function Navigation() {
  function logMeOut() {
    setCookie("hueToken", "", {
      days: 365,
      SameSite: "Lax",
      Secure: true,
    });
    setCookie("bridgeIp", "", {
      days: 365,
      SameSite: "Lax",
      Secure: true,
    });
    setToken(null);
  }
  const { setToken } = useContext(TokenContext);
  const navigationLinks = [
    { path: "/", name: "Home", icon: BsFillHouseFill },
    { path: "/lights", name: "Lights", icon: BsLightbulb },
    { path: "/rooms", name: "Rooms", icon: BsDoorOpen },
    { name: "Log out", icon: BsBoxArrowLeft, onClick: () => logMeOut() },
  ];
  return (
    <ComponentWrapper
      type="nav"
      className="z-50 flex-row rounded-full sm:rounded-3xl justify-center fixed sm:top-4 w-full p-2 items-center bottom-0 sm:sticky flex select-none sm:bg-lighter sm:p-6 sm:min-w-fit sm:max-w-xs sm:flex-col sm:h-[96.5vh]"
    >
      <Logo className="mx-auto mb-12 hidden sm:flex" />
      <ul className="flex gap-8  justify-center rounded-3xl sm:justify-start w-full mx-auto bg-lighter sm:gap-6 sm:flex-col sm:h-full">
        {navigationLinks.map((link) =>
          link.onClick ? (
            <Button
              key={link.name}
              className="items-center !p-0 hover:bg-black/50 sm:bg-black text-xl sm:!p-4 sm:text-left sm:mt-auto sm:flex sm:w-full transition-all"
              onClick={link.onClick}
            >
              <link.icon className="inline-block my-3 sm:my-0 sm:mr-4 sm:text-2xl text-4xl" />
              <p className="hidden sm:block">{link.name}</p>
            </Button>
          ) : (
            <li key={link.path}>
              <NavigationLink path={link.path}>
                <link.icon className="inline-block my-3 sm:my-0 sm:mr-4 sm:text-2xl text-4xl" />
                <p className="hidden sm:block">{link.name}</p>
              </NavigationLink>
            </li>
          )
        )}
      </ul>
    </ComponentWrapper>
  );
}
