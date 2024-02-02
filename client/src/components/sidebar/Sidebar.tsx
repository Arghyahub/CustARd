import { Link } from "react-router-dom"

import {
  Sheet,
  // SheetClose,
  SheetContent,
  // SheetDescription,
  // SheetFooter,
  // SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BarsSVG } from "@/assets/"
import { cn } from "@/lib/utils"
import { FunctionComponent } from "react";

interface SidebarPropsType {
  TriggerIcon?: FunctionComponent<{ className?: string|undefined }>;
  Position?: 'left' | 'right' | 'top' | 'bottom',
}

const Sidebar = ({TriggerIcon=BarsSVG, Position='left'}:SidebarPropsType) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="active:rotate-180 duration-700">
            <TriggerIcon className='w-8 h-8' />
        </button>
      </SheetTrigger>
      <SheetContent side={Position}>
        {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}

        <div className="flex flex-col w-full h-full mt-4 gap-2">
          <div className="w-full h-14 bg-gray-100 rounded-md flex flex-row items-center pl-4"><Link to='/'>Some Link or function</Link></div>
          <div className="w-full h-14 bg-gray-100 rounded-md flex flex-row items-center pl-4"><Link to='/'>Some Link or function</Link></div>
          <div className="w-full h-14 bg-gray-100 rounded-md flex flex-row items-center pl-4"><Link to='/'>Some Link or function</Link></div>
          <div className="w-full h-14 bg-gray-100 rounded-md flex flex-row items-center pl-4"><Link to='/'>Some Link or function</Link></div>
        </div>

        <div className="grid gap-4 py-4">
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div> */}
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  )
}

export default Sidebar;