import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import * as ico from "lucide-react"
import { useEffect, useState } from 'react'
import { DialogPayroll } from "@/components/PayrollGenerateDialog"
import moment from "moment"

function Payroll() {
  const [payroll, setPayroll] = useState<any[]>([])

  const fetchPayroll = async () => {
    try {
      const res = await fetch('http://localhost:3000/payroll')
      const data = await res.json()
      setPayroll(data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPayroll()
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex justify-end mr-5">
          <DialogPayroll onSuccess={fetchPayroll} />
        </div>

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
                {payroll.map((p: any) => (
                  <TableRow key={p.id}>
                    <TableCell className="text-center">{p.employee.idEmployee}</TableCell>
                    <TableCell className="text-center">{p.employee.nameFirst} {p.employee.nameLast}</TableCell>
                    <TableCell className="text-center">{p.basePay}</TableCell>
                    <TableCell className="text-center">{p.hoursPaid}</TableCell>
                    <TableCell className="text-center">{p.payOvertime}</TableCell>
                    <TableCell className="text-center">{p.deductionsTotal}</TableCell>
                    <TableCell className="text-center">{p.netPay}</TableCell>
                    <TableCell className="text-center">{moment(p.datePaid).format('L')}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-red-500">
                        <ico.BadgeX /> Unpaid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <DialogPayroll onSuccess={fetchPayroll} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </main>
    </SidebarProvider>
  )
}

export default Payroll
