import React from "react";

import { cn } from "@/lib/utils";
import { 
  BarsSVG, 
  LogoSVG,
  UserSVG

} from "../../assets/index";
import Sidebar from "../sidebar/Sidebar";
import NavDropDown from "./NavDropDown";

const Navbar = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "bg-[var(--foreground)] h-14 flex flex-row items-center",
        className
      )}
    >
      {/* Left options */}
      <div className="flex flex-row items-center ml-4 h-full">
        <Sidebar TriggerIcon={BarsSVG} />
        <LogoSVG className="ml-3 w-8 h-8 text-[var(--secondary)]" />
        <h6 className="text-white special-font ml-2 font-semibold">
          W h e r e I L e f t
        </h6>
      </div>

      {/* Right options */}
      <div className="ml-auto mr-4 h-full flex flex-row items-center">
        <NavDropDown/>
      </div>

    </div>
  );
};

export default Navbar;
