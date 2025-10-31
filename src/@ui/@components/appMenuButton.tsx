import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

export function MenuButton() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="
            flex
            p-1
            text-xl
            rounded-md
            cursor-pointer
            absolute right-2 top-2 item-center
          "
        >
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="
            bg-gray-200
            me-10
            md:mr-25
          "
        >
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavLink to="/profile">Profile</NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NavLink to="/settings">Settings</NavLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
