"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import z from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import moment from "moment"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

const formSchema = z.object({
  idEmployee: z.string({message: "Please input a valid ID number."})

})

interface NewAttendanceDialogers {
  onSuccess?: any;
}

export function DialogAttendance({onSuccess}: NewAttendanceDialogers) {

  const [open, setOpen] = useState(false)

  const [time, setTime] = useState(new Date());
  useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        idEmployee: "",

      },
    })
  const [employees] = useState<any>([]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    const res = await fetch('http://localhost:3000/employees/' + values.idEmployee);
    const data = await res.json();
    console.log(values.idEmployee)
    const employee = data.data;

    const body = {
      idEmployee: employee.id,
      timeIn: new Date().toISOString(),
    };

    console.log(body);


    const postRes = await fetch("http://localhost:3000/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });



    setOpen(false);
    onSuccess();
  } catch (error) {
    console.error(error);
  }
}

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button className="w-[100px] mx-auto mt-4 text-white">Time In</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Employee Attendance</DialogTitle>
          <DialogDescription>
            Scan ID Code for attendance.
          </DialogDescription>
        </DialogHeader>

        <div className="flex w-full flex-col gap-6 mt-4">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="timein">TIME IN</TabsTrigger>
              <TabsTrigger value="timeout">TIME OUT</TabsTrigger>
            </TabsList>

            <TabsContent value="timein">
              <Card>
                <CardHeader>
                  <CardTitle>TIME IN</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="idEmployee"
                        render={({ field }) => (
                          <FormItem>
                            <div>
                            <FormLabel>ID</FormLabel>
                            <FormControl>
                              <Input 
                              type="number"
                              placeholder="" {...field}
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter"){
                                  e.preventDefault();
                                  form.handleSubmit(onSubmit)();
                                }
                              }}
                              className="mt-2"/>
                            </FormControl>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                
                            </div>
                            <FormMessage />
                          </FormItem>
                      )} />
                      <Button type="submit"> Send </Button>
                      </form>
                      </Form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeout">
              <Card>
                <CardHeader>
                  <CardTitle>TIME OUT</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-new">ID</Label>
                    <Input id="tabs-demo-new" type="text" className="border-1 border-black"/>
                  </div>
                </CardContent>
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