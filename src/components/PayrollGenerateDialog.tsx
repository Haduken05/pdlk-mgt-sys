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

interface NewPayrollDialogers {
  onSuccess?: () => void;
}

export function DialogPayroll({onSuccess}: NewPayrollDialogers) {

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
  const [payroll, setPayroll] = useState<any>([]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`http://localhost:3000/employees/${values.idEmployee}`)
      
      const data = await res.json()
      if (!res.ok) return
      const employee = data.data
      if (!employee) return

      const body = {
        idEmployee: employee.idEmployee,
        basePay: payroll.basePay,
        deductSSS: 500,
        deductPH: 500,
        deductPI: 500,
        deductBIR: 500,
        status: "UNPAID",
        datePaid: new Date().toISOString(),
        payOvertime: 0,
        deductionsOthers: 500,
        memoOtherDeductions: "500",
        deductionsTotal: 500,
        additionalOther: 500,
        memoAdditional: "500",
        netPay: 250000,
        hoursPaid: 8,
        type: "PAYROLL",
        month: new Date().toISOString(),
        // deductSSS: payroll.deductSSS,
        // deductPH: payroll.deductPH,
        // deductPI: payroll.deductPI,
        // deductBIR: payroll.deductBIR,
        // status: payroll.status,
        // datePaid: payroll.datePaid,
        // payOvertime: payroll.payOvertime,
        // deductionsOthers: payroll.deductionsOthers,
        // memoOtherDeductions: payroll.memoOtherDeductions,
        // deductionsTotal: payroll.deductionsTotal,
        // additionalOther: payroll.additionalOther,
        // memoAdditional: payroll.memoAdditional,
        // netPay: payroll.netPay,
        // hoursPaid: payroll.hoursPaid,
        // type: payroll.type,
        // month: payroll.month,
      }
      console.log(employee.idEmployee)
      const postRes = await fetch("http://localhost:3000/payroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const postData = await postRes.json()
      if (!postRes.ok) return

      setOpen(false)
      onSuccess?.()
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button className="w-[200px] mx-auto mt-4 text-white">Generate Payroll</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>PadalaKo Payroll</DialogTitle>
            <DialogDescription>
            PadalaKo Employee Payroll System
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
            <Button type="submit">Generate</Button>
        </DialogFooter>
        </form>
        </Form>
        </DialogContent>
    </Dialog>
  )
}