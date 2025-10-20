import { Button } from "@/components/ui/button"
import moment from 'moment';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import * as ico from "lucide-react"
import { useEffect, useState } from 'react';
import { EmployeeDialogNew } from "@/components/EmployeeNewDialog";

  function EmployeeReqs() {
    const [employees, setEmployees] = useState([]);

    function fetchEmployees(){
      fetch('http://localhost:3000/employees')
        .then(res => res.json())
        .then(data => setEmployees(data.data));
    }
    useEffect(() => {
      fetchEmployees()
    }, []);

    const [cardData, setCardData] = useState({
    title: "Employee Requests",
    description: "Handle employee requests in this section.",
    content: "THERE ARE NO NEW REQUESTS",
    });

    const handleUpdateClick = () => {
        setCardData({
        title: "Employee Requests",
        description: "Handle employee requests in this section.",
        content: "The content has been dynamically changed!",
        });
    };

   return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Card className="w-[1050px] mx-25 mt-8 absolute">
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>{cardData.title}</CardTitle>
                    <CardDescription>{cardData.description}</CardDescription>
                </div>
            </CardHeader>
            <Separator className="" />
            <CardContent>
                <p className="text-2xl">{cardData.content}</p>
            </CardContent>
            {/* <CardFooter>
            </CardFooter> */}
        </Card>
      </main>
    </SidebarProvider>
  )
}

export default EmployeeReqs


