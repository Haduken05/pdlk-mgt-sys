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


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="text-black">PadalaKo Management System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div  className="text-white bg-black p-1">DASHBOARD</div>
                <SidebarMenuSub>
                  
                  <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <a href="Dashboard">
                      <ico.Monitor/>
                      <span className="text-black">Overview/Analytics</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>

                </SidebarMenuSub>
                <div  className="text-white bg-black p-1">HUMAN RESOURCES</div>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <a href="Employee">
                        <ico.Users />
                        <span className="text-black">Employees</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
                
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <a href="Attendance">
                        <ico.Clock />
                        <span className="text-black">Attendance</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>

                <div  className="text-white bg-black p-1">FINANCES</div>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <a href="Payroll">
                        <ico.Receipt />
                        <span className="text-black">Payroll</span>
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
                      <ico.User/>
                      <div>Admin</div>
                      <ico.ChevronUp className="ml-auto"/>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton>
                          <a href="Account">
                            <span className="text-black">Account</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Dialog>
                            <DialogTrigger asChild>
                              <SidebarMenuButton className="text-black">Log Out</SidebarMenuButton>
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
                                <Button><a href="/">Log Out</a></Button>
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

                 
                
             