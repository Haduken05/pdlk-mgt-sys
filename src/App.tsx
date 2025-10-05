import { Navigate, redirect, useNavigate } from "react-router";
import { use, useState, type FormEvent } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Input } from './components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
  idEmployee: z.number({message: "Please input a valid ID number."}).max(999999),
  passEmployee: z.string()

})


function App() {
const navigate = useNavigate();
const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        idEmployee: NaN,
        passEmployee: ""

      },
    })


async function onSubmit(values: z.infer<typeof formSchema>){
  try {
    try {
      const res = await fetch("http://localhost:3000/employees/check-password/"+values.idEmployee, {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify(values),
      })
      const data = await res.json();
      console.log(data)
      if(data.status){
        navigate('/dashboard')
      } else {
        console.log('asdasdad')
      }
      } catch (error) {

        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Wrong ID or Password </DialogTitle>
              <DialogDescription>
                Please input proper credentials
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        console.log(error);
        console.log('error');
    }
    console.log(values)
    }catch(error){console.log(error)}
}
  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center h-screen m-0">
        <div className='flex flex-col items-center bg-white w-[90%] max-w-[400px] p-[30px] rounded-[15px] border-2 absolute z-50'>

            <div className='text-center mb-[25px] text-green-600'>
                <h1 className='m-0 text-[24px] font-bold'>Welcome to PadalaKo</h1>
                <h1 className='text-[18px] text-gray-900 mt-[5px] mb-0 ml-0 mr-0'>Management System</h1>
            </div>

            <FormField
              control={form.control}
              name="idEmployee"
              render={({ field }) => (
                <FormItem className='w-[100%] mt-[10px] mb-[10px] ml-0 mr-0'>
                  <FormLabel className='text-black'>ID Number</FormLabel>
                  <FormControl>
                    <Input 
                    type="number"
                    placeholder='ID'
                    {...field}
                    value={field.value ?? ""}
                    className="w-[100%] py-[12px] px-[14px] border border-solid border-gray-300 rounded-[8px] text-sm outline-none box-border transition-colors duration-200 focus:border-[#4caf50] focus:shadow-[0_0_5px_rgba(76,175,80,0.5)] text-black" 
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}/>
                  </FormControl>
                  </FormItem>
                
                  )} /> 

            <FormField
              control={form.control}
              name="passEmployee"
              render={({ field }) => (
                <FormItem className='w-[100%] mt-[10px] mb-[10px] ml-0 mr-0'>
                  <FormLabel className='text-black'>Password</FormLabel>
                  <FormControl>
                    <Input 
                    type='text'
                    placeholder='Password'
                    {...field}
                    value={field.value ?? ""}
                    className="w-[100%] py-[12px] px-[14px] border border-solid border-gray-300 rounded-[8px] text-sm outline-none box-border transition-colors duration-200 focus:border-[#4caf50] focus:shadow-[0_0_5px_rgba(76,175,80,0.5)] text-black" 
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : String(e.target.value))}/>
                  </FormControl>
                  </FormItem>
                
                  )} /> 
            

            {/* <Button type="submit" className='mt-[20px] w-[100%] p-[12px] bg-[#4caf50] text-white text-[16px] font-bold border-none rounded-[8px] 
            cursor-pointer text-center transition-colors duration-200 hover:bg-[#388e3c] hover:scale-[1.02]'>Login</Button> */}

              <Button type="submit">Login</Button>
        </div>
      
      </div>
    </form>
  </Form>
  )
}

export default App
