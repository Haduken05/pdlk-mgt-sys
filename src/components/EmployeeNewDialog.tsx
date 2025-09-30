"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { z } from "zod"
 
const formSchema = z.object({
  nameFirst: z.string().min(2).max(70),
  nameLast: z.string().min(2).max(70),
  departMent: z.string().min(2).max(50),
  depRole: z.string().min(2).max(50),
  emailAddress: z.string().min(2).max(50),
  salaryGrade: z.string().min(1).max(50),
  cpNumber: z.string().min(13).max(13),


})

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
import * as ico from "lucide-react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useState } from "react"

interface NewEmployeeDialogers {
  employeeLength: any;
  onSuccess?: any;
}
export function EmployeeDialogNew({employeeLength, onSuccess}: NewEmployeeDialogers) {

  const [open, setOpen] = useState(false)

  function generateID(hireDate: String){
    let employeeID = 100000;
    if(hireDate = "2025"){ 
      employeeID = 300000 + employeeLength
    }
    console.log(employeeLength)
    return employeeID
  }
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameFirst: "",
      nameLast:"",
      departMent:"",
      depRole: "",
      emailAddress:"",
      salaryGrade:"",
      cpNumber: ""
      

    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    let gpay = 0;
    if(values.salaryGrade == "A"){ gpay = 25000}
    else if(values.salaryGrade == "S"){ gpay = 35000}
    else if(values.salaryGrade == "SR"){ gpay = 95000}
    else if(values.salaryGrade == "SS"){ gpay = 150000}
    else if(values.salaryGrade == "SSR"){ gpay = 250000}
    else if(values.salaryGrade == "SSR+"){ gpay = 500000}
    
    const data = {
      ...values,
      "idEmployee": generateID('2025'),
      "payGross": gpay,
      "hireDate": new Date().toISOString()
    }
    console.log(data)
    fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(data),
    })
      .then((res) => 
        {res.json()
          setOpen(false)
          onSuccess()
        })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button><ico.UserPlus/>Add New</Button>
        </DialogTrigger>
        
        
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Employee Data</DialogTitle>
            <DialogDescription>
              Create new employee data and details.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
          control={form.control}
          name="nameFirst"
          render={({ field }) => (
              <FormItem>
                <div>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="mt-2"/>
                </FormControl>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    
                </div>
                <FormMessage />
              </FormItem>
            
          )} />
          <FormField
          control={form.control}
          name="nameLast"
          render={({ field }) => (
              <FormItem>
                <div>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="mt-2"/>
                </FormControl>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    
                </div>
                <FormMessage />
              </FormItem>
            
          )} />
          <FormField
          control={form.control}
          name="departMent"
          render={({ field }) => (
              <FormItem>
                <div>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="mt-2"/>
                </FormControl>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    
                </div>
                <FormMessage />
              </FormItem>
            
          )} />
          <FormField
          control={form.control}
          name="depRole"
          render={({ field }) => (
              <FormItem>
                <div>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="mt-2"/>
                </FormControl>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    
                </div>
                <FormMessage />
              </FormItem>
            
          )} />
          <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
              <FormItem>
                <div>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="mt-2"/>
                </FormControl>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    
                </div>
                <FormMessage />
              </FormItem>
            
          )} />
          <FormField
          control={form.control}
          name="cpNumber"
          render={({ field }) => (
              <FormItem>
                <div>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="mt-2"/>
                </FormControl>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    
                </div>
                <FormMessage />
              </FormItem>
            
          )} />
          <FormField
          control={form.control}
          name="salaryGrade"
          render={({ field }) => (
              <FormItem>
                <div>
                <FormLabel>Salary Grade</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="mt-2"/>
                </FormControl>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    
                </div>
                <FormMessage />
              </FormItem>
            
          )} />
                  
                  <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
            </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}
