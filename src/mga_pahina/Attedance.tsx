
import { SidebarProvider} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DialogAttendance } from "@/components/AttendanceDialog"
import { useEffect, useState } from "react"
import moment from "moment"
import { Button } from "@/components/ui/button"
import * as ico from "lucide-react"


function Attendance() {

  const [attendance, setAttendance] = useState([]);
  
      useEffect(() => {
        fetch('http://localhost:3000/attendance')
          .then(res => res.json())
          .then(data => setAttendance(data.data));
  
      }, []);

    function fetchAttendance(){
      fetch('http://localhost:3000/attendance')
        .then(res => res.json())
        .then(data => setAttendance(data.data));
    }
    useEffect(() => {
      fetchAttendance()

    }, []);

    function timeOutie(id: string){
    const body: any = {

        timeOut: new Date().toISOString(),
        
      }
      console.log(body)
    fetch("http://localhost:3000/attendance/"+ id, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
      })
        .then((res) => 
          {res.json()
           fetchAttendance()
          })
        .catch((error) => {
          console.log(error);
        });
  }

   return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex justify-self-end-safe mr-5">
          <DialogAttendance onSuccess={fetchAttendance}/>
        </div>
        <Separator className="my-4" />
        <Card className="w-[1200px] mx-auto mt-8">
            <CardHeader>
                <CardTitle>Attendance</CardTitle>
                <CardDescription>Attendance List for Employees</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption></TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px] text-center">Employee ID</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Time In</TableHead>
                        <TableHead className="text-center">Time Out</TableHead>
                        <TableHead className="text-center">Overtime Hours</TableHead>
                        <TableHead className="text-center">Late Arrival</TableHead>
                        <TableHead className="text-center">Early Out</TableHead>
                        <TableHead className="text-center">Hours Worked</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendance.map((attendance: any) =>(
                        <TableRow key={attendance.id}>
                        <TableCell className="text-center">{attendance.employee.idEmployee}</TableCell>
                        <TableCell className="text-center">{attendance.employee.nameFirst} {attendance.employee.nameLast}</TableCell>
                        <TableCell className="text-center">{moment(attendance.timeIn).format('LTS')}</TableCell>
                        <TableCell className="text-center">{moment(attendance.timeOut).isValid() ? moment(attendance.timeOut).format('LTS') : ""}</TableCell>
                        <TableCell className="text-center">{attendance.overHours}</TableCell>
                        <TableCell className="text-center">{attendance.lateHours}</TableCell> 
                        <TableCell className="text-center">{attendance.earlyOutTime}</TableCell>
                        <TableCell className="text-center">{attendance.workedHours}</TableCell>
                        <TableCell className="text-center"><Button variant="secondary" className="w-[60] h-[15] bg-gray-700" onClick={() => timeOutie(attendance.id)}><ico.Clock/>Time Out</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </SidebarProvider>
  )
}

export default Attendance
