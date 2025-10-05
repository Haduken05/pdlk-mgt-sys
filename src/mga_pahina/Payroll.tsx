import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import * as ico from "lucide-react"
import { useEffect, useState } from 'react';
import { DialogPayroll } from "@/components/PayrollDialog"
import moment from "moment"
function Payroll() {

  const [payroll, setPayroll] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3000/payroll')
        .then(res => res.json())
        .then(data => setPayroll(data.data));

    }, []);

    function payStatus(status: any){


    }

   return (
    <SidebarProvider>
      <AppSidebar />
        <main className="w-full">
        <Card className="w-[1200px] mx-auto mt-8">
            <CardHeader className="flex justify-between">
                <div>
                  <CardTitle>Employee Payroll</CardTitle>
                  <CardDescription className="mt-2">PadalaKo Employee Payroll System</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Table>

                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px] text-center">ID Number</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Hourly Rate</TableHead>
                        <TableHead className="text-center">Paid Hours</TableHead>
                        <TableHead className="text-center">Overtime Pay</TableHead>
                        <TableHead className="text-center">Deductions</TableHead>
                        <TableHead className="text-center">Net Pay</TableHead>
                        <TableHead className="text-center">Date</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payroll.map((payroll: any) =>(
                        <TableRow>
                        <TableCell className="text-center">{payroll.employee.idEmployee}</TableCell>
                        <TableCell className="text-center">{payroll.employee.nameFirst} {payroll.employee.nameLast}</TableCell>
                        <TableCell className="text-center">{payroll.basePay}</TableCell>
                        <TableCell className="text-center">{payroll.hoursPaid}</TableCell>
                        <TableCell className="text-center">{payroll.payOvertime}</TableCell>
                        <TableCell className="text-center">{payroll.deductionsTotal}</TableCell>  
                        <TableCell className="text-center">{payroll.netPay}</TableCell>
                        <TableCell className="text-center">{moment(payroll.datePaid).format('L')}</TableCell>
                        <TableCell className="align-center"><Badge variant="secondary" className="bg-red-500"><ico.BadgeX />Unpaid</Badge></TableCell>
                        <TableCell>
                            <DialogPayroll/>
                        </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <p> </p>
            </CardFooter>
        </Card>
      </main>
    </SidebarProvider>
  )
}

export default Payroll
