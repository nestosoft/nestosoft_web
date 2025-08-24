import { NavLink } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList} from "./ui/navigation-menu";
import {  } from "@radix-ui/react-navigation-menu";

const Navigation = () => {
    return (<>

    <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? 'underline text-blue-600 dark:text-blue-400' : 'text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400';
              }}
            >
              <NavigationMenuLink>Home</NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
          {/* <NavigationMenuItem className="text-sm/6 font-semibold text-gray-900">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-4 md:w-[400px] lg:w-[500px] flex flex-col space-y-2">
                <NavLink
                  to="/rememberthis"
                  className={({ isActive }) => {
                    return isActive ? 'underline' : 'text-black';
                  }}
                >
                  <NavigationMenuLink>Remember this!</NavigationMenuLink>
                </NavLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavLink
              to="/showcase"
              className={({ isActive }) => {
                return isActive ? 'underline' : 'text-black';
              }}
            >
              <NavigationMenuLink>Case studies</NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
      </>)
}

export default Navigation