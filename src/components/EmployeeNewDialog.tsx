"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const formSchema = z.object({
  nameFirst: z.string().min(2).max(70),
  nameLast: z.string().min(2).max(70),
  departMent: z.string().max(50),
  depRole: z.string().min(2).max(50),
  emailAddress: z.string().min(2).max(50),
  salary: z.number(),
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
let department = [
  { label: "Marketing", value: "Marketing" },
  { label: "IS Operations", value: "IS Operations" },
  { label: "Finance", value: "Finance" },
  { label: "General Operations", value: "General Operations" },
  { label: "Human Resources", value: "Human Resources" },
  { label: "Legal & Compliance", value: "Legal" }
];


export function EmployeeDialogNew({employeeLength, onSuccess}: NewEmployeeDialogers) {

  const [open, setOpen] = useState(false);

  function generateID(hireDate: String){
    let employeeID = 100000;
    if(hireDate = "2025"){ 
      employeeID = 300000 + employeeLength
    }
    console.log(employeeLength)
    return employeeID
  }
  function generatePassword(employeeId: number){
    let passEmployee = 'empass'+ employeeId;

    console.log(passEmployee)
    return passEmployee
  }
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameFirst: "",
      nameLast:"",
      departMent:"",
      depRole: "",
      emailAddress:"",
      salary: NaN,
      cpNumber: ""
      

    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    let gpay = 0;
    let salaryGrade ="";
    if(values.salary <= 25000){ salaryGrade = "A"}
    else if(values.salary <= 35000){ salaryGrade = "S"}
    else if(values.salary <= 95000){ salaryGrade = "SS"}
    else if(values.salary <= 150000){ salaryGrade = "SR"}
    else if(values.salary <= 250000){ salaryGrade = "SSR"}
    else { salaryGrade = "SSR+"}
    
    let dep = '';
    if(values.departMent == "Marketing"){dep = "Marketing"}
    else if(values.departMent == "Human Resources"){dep = "Human Resources"}
    else if(values.departMent == "General Operations"){dep = "General Operations"}
    else if(values.departMent == "IS Operations"){dep = "IS Operations"}
    else if(values.departMent == "Finance"){dep = "Finance"}
    else if(values.departMent == "Human Resources"){dep = "Human Resources"}

    const generatedID = generateID('2025')
    const data = {
      ...values,
      "idEmployee": generatedID,
      "departMent": dep, 
      "payGross": gpay,
      "hireDate": new Date().toISOString(),
      "passEmployee": generatePassword(generatedID),
      "salaryGrade": salaryGrade
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
          <Button className="text-white"><ico.UserPlus/>Add New</Button>
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
                <FormLabel>Department</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="IS Operations">IS Operations</SelectItem>
                  <SelectItem value="General Operations">General Operations</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Legal & Compliance">Legal & Compliance</SelectItem>
                </SelectContent>
              </Select>
                <FormMessage />
              </FormItem>
            
          )} />
          <FormField
          control={form.control}
          name="depRole"
          render={({ field }) => (
              <FormItem>
                <div className="mt-2">
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
          name="salary"
          render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="" {...field} 
                  onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                  className="mt-2"/>
                </FormControl>
                <FormMessage />
              </FormItem> 
              )} />
                  
                  <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="text-white">Submit</Button>
            </DialogFooter>
            </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}
