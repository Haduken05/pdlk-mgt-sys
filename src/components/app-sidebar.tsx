import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import * as ico from "lucide-react"
import React from "react"
import { Separator } from "./ui/separator"
import { useTheme } from "@/components/theme-provider"




export function AppSidebar() {
  const {setTheme, theme} = useTheme()
  
  const toggleTheme = () => {
    
    if(theme == "light"){
      setTheme("dark")
    }else{
      setTheme("light")
    }
    console.log(theme)
  }
  return (
    <Sidebar>
      <SidebarContent>

        <SidebarGroup>

        <SidebarGroupLabel className="flex items-center text-white px-4 py-3 mt-2 bg-green-800 rounded-lg shadow-md h-[20%] mb-2">
          <ico.PhilippinePeso
            className="mr-2 text-white scale-200 pl-[2px]"
            onClick={() => toggleTheme()}
          />
          <div className="w-[2px] h-[100%] bg-white/70 mx-3 rounded"></div>
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold">PadalaKo</span>
            <span className="text-sm text-green-200 font-medium">Management System</span>
          </div>
        </SidebarGroupLabel>




          <SidebarGroupContent>
            
            <SidebarMenu className="mt-4">
              <SidebarMenuItem>
                <div  className="text-background bg-kolor p-1 rounded pl-[10px]">DASHBOARD</div>
                <SidebarMenuSub>
                  <SidebarMenuSubItem className="my-1">
                  <SidebarMenuSubButton asChild>
                    <a href="Dashboard">
                      <ico.Monitor/>
                      <span className="">Overview/Analytics</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                </SidebarMenuSub>
                <div  className="text-background bg-kolor p-1 rounded pl-[10px]">HUMAN RESOURCES</div>
                <SidebarMenuSub>
                  <SidebarMenuSubItem className="mt-1">
                    <SidebarMenuSubButton asChild>
                      <a href="Employee">
                        <ico.Users />
                        <span className="">Employees</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
                
                <SidebarMenuSub>
                  <SidebarMenuSubItem className="mt-1">
                    <SidebarMenuSubButton asChild>
                      <a href="Requests">
                        <ico.UserSquare />
                        <span className="">Employee Requests</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
                
                <SidebarMenuSub>
                  <SidebarMenuSubItem className="my-1">
                    <SidebarMenuSubButton asChild>
                      <a href="Attendance">
                        <ico.Clock />
                        <span className="">Attendance</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>

                <div  className="text-background bg-kolor p-1 rounded pl-[10px]">FINANCES</div>
                <SidebarMenuSub>
                  <SidebarMenuSubItem className="mt-1">
                    <SidebarMenuSubButton asChild>
                      <a href="ExpensesRevenue">
                        <ico.CircleDollarSign />
                        <span className="">Revenue & Expenses</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>

                <SidebarMenuSub>
                  <SidebarMenuSubItem className="mt-1">
                    <SidebarMenuSubButton asChild>
                      <a href="Payroll">
                        <ico.Receipt />
                        <span className="">Payroll</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>

              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="w-full border-green-950 border-t-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <ico.User />
                      <div className="">User</div>
                      <ico.ChevronUp className="ml-auto"/>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <a href="Account">
                        <SidebarMenuButton className="">Account</SidebarMenuButton>
                        </a>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Dialog>
                            <DialogTrigger asChild>
                              <SidebarMenuButton className="">Log Out</SidebarMenuButton>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Confirm Logout</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to log out? Any unsaved changes may or may not be saved idk.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button className="text-white"><a href="/">Log Out</a></Button>
                              </DialogFooter>
                            </DialogContent>
                        </Dialog>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}

                 
                
             