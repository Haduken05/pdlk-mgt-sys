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

const formSchema = z.object({
  idEmployee: z.number({message: "Please input a valid ID number."}).max(999999),

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
        idEmployee: NaN,

      },
    })
  const [employees, setEmployees] = useState<any>([]);
  function onSubmit(values: z.infer<typeof formSchema>){
    
    try {
      fetch('http://localhost:3000/employees/'+values.idEmployee)
        .then(res => res.json())
        .then(data => setEmployees(data.data));

      
      const body: any = {

        idEmployee: employees.id,
        timeIn: new Date().toISOString(),
        
      }
      console.log(body)

      fetch("http://localhost:3000/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
      })
        .then((res) => 
          {res.json()
            setOpen(false)
            onSuccess()})
        .catch((error) => {
          console.log(error);
        });
      } catch (error) {
        console.log(error)
      }
    
  }

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button className="w-[200px] mx-auto mt-4">Attendance</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>PDLK TIME SYSTEM</DialogTitle>
            <DialogDescription>
            PadalaKo Employee Attendance System
            </DialogDescription>
        </DialogHeader>
        <div>
          {moment().format('L')} {time.toLocaleTimeString('en-US')}
        </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
            <div className="grid gap-3">
            <FormField
          control={form.control}
          name="idEmployee"
          render={({ field }) => (
              <FormItem>
                <div>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input 
                  type="number"
                  {...field}
                  value={field.value ?? ""}
                  className="mt-2" 
                  onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}/>
                </FormControl>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    
                </div>
                <FormMessage />
              </FormItem>
            
          )} />
            
            </div>
            <div className="grid gap-3">
            </div>
        </div>
        <DialogFooter>
            <Button type="submit">Time In</Button>
        </DialogFooter>
        </form>
        </Form>
        </DialogContent>
    </Dialog>
  )
}