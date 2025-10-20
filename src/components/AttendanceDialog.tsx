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
import { useEffect, useRef, useState } from "react"
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

  const inputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState("timein");

  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus();
    }
  },[activeTab])

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

  async function onSubmit2_Electric_Boogaloo(values: z.infer<typeof formSchema>){
    let currentDate = new Date();
    const time = currentDate.toLocaleTimeString("en-CA", {timeZone: "Asia/Manila", hour: '2-digit', minute:'2-digit', second:'2-digit',hourCycle:'h23'})
    const date = currentDate.toLocaleDateString("en-CA", {timeZone: "Asia/Manila"})
    const dateSplit = currentDate.toISOString().slice(0,10)
    const dateTime = `${dateSplit}T${time}`
    const newDateTime = new Date(dateTime)

    console.log(currentDate)
    console.log(date)

    const res = await fetch('http://localhost:3000/attendance/filter?employeeId=' + values.idEmployee + '&date=' + date);
    const data = await res.json();
    // console.log(values.idEmployee)
    const employee = data.data;
    // console.log(data)
    
    const body = {
      timeOut: newDateTime
    }

    fetch("http://localhost:3000/attendance/"+ employee[0].id, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
      })
        .then((res) => 
          {res.json()
            setOpen(false);
            onSuccess();
          })
        .catch((error) => {
          console.log(error);
        });

        
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    
    let currentDate = new Date();
    const time = currentDate.toLocaleTimeString("en-CA", {timeZone: "Asia/Manila", hour: '2-digit', minute:'2-digit', second:'2-digit',hourCycle:'h23'})
    const date = currentDate.toLocaleDateString("en-CA", {timeZone: "Asia/Manila"})
    const dateSplit = currentDate.toISOString().slice(0,10)
    const dateTime = `${dateSplit}T${time}`
    const newDateTime = new Date(dateTime)

    const body = {
      idEmployee: values.idEmployee,
      timeIn: newDateTime,
    };


    console.log(body);
    console.log(currentDate)
    console.log(newDateTime)


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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                            <FormLabel>Scan ID</FormLabel>
                            <FormControl>
                              <Input
                              placeholder=""
                              {...field}
                              autoFocus
                              autoComplete="off"
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
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit2_Electric_Boogaloo)}>
                      <FormField
                        control={form.control}
                        name="idEmployee"
                        render={({ field }) => (
                          <FormItem>
                            <div>
                            <FormLabel>Scan ID</FormLabel>
                            <FormControl>
                              <Input 
                              placeholder="" {...field}
                              autoFocus
                              autoComplete="off"
                              onKeyDown={(e) => {
                                if (e.key === "Enter"){
                                  e.preventDefault();
                                  form.handleSubmit(onSubmit2_Electric_Boogaloo)();
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
                      </form>
                      </Form>
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