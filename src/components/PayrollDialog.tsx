import { useEffect, useState } from "react"
import "../App.css"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import * as ico from "lucide-react"

export function DialogPayroll({
  title = "Employee Payroll Details"
}) {
  // Editable fields
  const [sss, setSss] = useState(2)
  const [philhealth, setPhilhealth] = useState(3)
  const [pagibig, setPagibig] = useState(200)
  const [tax, setTax] = useState(2)
  const [otHours, setOtHours] = useState(0)
  const [allowance, setAllowance] = useState(0)
  const [allowanceMemo, setAllowanceMemo] = useState("")
  const [otherDeduction, setOtherDeduction] = useState(0)
  const [deductionMemo, setDeductionMemo] = useState("")

  const [payroll, setPayroll] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3000/payroll')
        .then(res => res.json())
        .then(data => setPayroll(data.data));

    }, []);

    function fetchPayroll(){
      fetch('http://localhost:3000/payroll')
        .then(res => res.json())
        .then(data => setPayroll(data.data));
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[60] h-[25]" ><ico.Search/>View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto modal">
        
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Review and adjust payroll details
          </DialogDescription>
        </DialogHeader>
        {payroll.map((payroll: any) =>(
        <form className="space-y-6">
          {/* Basic Info */}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Employee Name</Label>
              <p>{payroll.employee.nameFirst} {payroll.employee.nameLast}</p>
            </div>
            <div>
              <Label>Employee ID</Label>
              <p>{payroll.employee.idEmployee}</p>
            </div>
          </div>

          {/* Gross Pay */}
          <div>
            <Label>Gross Pay</Label>
            <p>{payroll.employee.payGross}</p>
          </div>

          {/* Deductions */}
          <div>
            <h3 className="font-medium">Deductions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <Label>SSS</Label>
                <Input
                  value={sss}
                  onChange={(e) => setSss(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Philhealth</Label>
                <Input
                  value={philhealth}
                  onChange={(e) => setPhilhealth(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>PagIbig</Label>
                <Input
                  value={pagibig}
                  onChange={(e) => setPagibig(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Tax</Label>
                <Input
                  value={tax}
                  onChange={(e) => setTax(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Additions */}
          <div>
            <h3 className="font-medium">Additions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <Label>OT Hours</Label>
                <Input
                  value={otHours}
                  onChange={(e) => setOtHours(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Allowance (₱)</Label>
                <Input
                  value={allowance}
                  onChange={(e) => setAllowance(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Allowance Memo</Label>
                <Textarea
                  value={allowanceMemo}
                  onChange={(e) => setAllowanceMemo(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Other Deduction */}
          <div>
            <h3 className="font-medium">Other Deductions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <Label>Deduction (₱)</Label>
                <Input
                  value={otherDeduction}
                  onChange={(e) => setOtherDeduction(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Deduction Memo</Label>
                <Textarea
                  value={deductionMemo}
                  onChange={(e) => setDeductionMemo(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Net Pay */}
          <div>
            <Label>Total Net Pay</Label>
            <p>123, 480</p>
          </div>
          
          {/* Footer */}
          <DialogFooter className="flex flex-col-reverse sm:flex-row justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full sm:w-auto">
              Pay
            </Button>
          </DialogFooter>
          
        </form>
        ))}
      </DialogContent>
    </Dialog>
  )
}