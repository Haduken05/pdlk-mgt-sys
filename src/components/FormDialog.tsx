import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import * as ico from "lucide-react"

export function FormDialog() {

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)


  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="text-lg text-white">REQUEST FORM</Button>
      </DialogTrigger>


      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Request Form</DialogTitle>
          <DialogDescription>
            Fill in your account details or change your password.
          </DialogDescription>
        </DialogHeader>

        <div className="flex w-full flex-col gap-6 mt-4">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Certificate of Employment</TabsTrigger>
              <TabsTrigger value="password">Leave Request Form</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Certificate of Employment</CardTitle>
                  <CardDescription>
                    Add details for CoE processing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-name">Name</Label>
                    <Input id="tabs-demo-name" defaultValue="" className="border-1 border-black"/>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-username">ID</Label>
                    <Input id="tabs-demo-username" defaultValue="" className="border-1 border-black"/>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="text-white">Send details</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Form</CardTitle>
                  <CardDescription>
                    Add details for leave processing.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-current">Name</Label>
                    <Input id="tabs-demo-current" type="text" className="border-1 border-black"/>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-new">ID</Label>
                    <Input id="tabs-demo-new" type="text" className="border-1 border-black"/>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-new">Date</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="w-48 justify-between font-normal"
                        >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ico.ChevronDown />
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                            }}
                        />
                        </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="text-white">Send details</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="text-white">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
