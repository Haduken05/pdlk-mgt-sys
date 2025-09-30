import { Button } from "@/components/ui/button"
import moment from 'moment';
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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import * as ico from "lucide-react"
import { useEffect, useState } from 'react';
import { EmployeeDialogNew } from "@/components/EmployeeNewDialog";

  function Employee() {
    const [employees, setEmployees] = useState([]);

    function fetchEmployees(){
      fetch('http://localhost:3000/employees')
        .then(res => res.json())
        .then(data => setEmployees(data.data));
    }
    useEffect(() => {
      fetchEmployees()

    }, []);
   return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Card className="w-[1250px] mx-auto mt-8">
            <CardHeader className="flex justify-between">
                <div>
                  <CardTitle>Employee Management</CardTitle>
                  <CardDescription className="mt-2">List of PadalaKo Employees</CardDescription>
                </div>
                <EmployeeDialogNew employeeLength={employees.length} onSuccess={fetchEmployees}/>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption></TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px] text-center">ID Number</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Department</TableHead>
                        <TableHead className="text-center">Role</TableHead>
                        <TableHead className="text-center">Date Hired</TableHead>
                        <TableHead className="text-center">Email Address</TableHead>
                        <TableHead className="text-center">Contact Number</TableHead>
                        <TableHead className="text-center">Salary Grade</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                      
                      {employees.map((employee: any) =>(
                        <TableRow>
                        <TableCell className="text-center">{employee.idEmployee}</TableCell>
                        <TableCell className="text-center">{employee.nameFirst} {employee.nameLast}</TableCell>
                        <TableCell className="text-center">{employee.departMent}</TableCell>
                        <TableCell className="text-center">{employee.depRole}</TableCell>
                        <TableCell className="text-center">{moment(employee.hireDate).isValid() ? moment(employee.hireDate).format('L') : ""}</TableCell>
                        <TableCell className="text-center">{employee.emailAddress}</TableCell>
                        <TableCell className="text-center">{employee.cpNumber}</TableCell>  
                        <TableCell className="text-center">{employee.salaryGrade}</TableCell>
                        </TableRow> 
                      ))}
                        
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <p></p>
            </CardFooter>
        </Card>
      </main>
    </SidebarProvider>
  )
}

export default Employee


