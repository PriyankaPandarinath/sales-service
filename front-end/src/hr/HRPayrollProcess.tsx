import React, { useState } from 'react';
import {
  Calendar,
  Calculator,
  Save,
  Lock,
  IndianRupee,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

/* ---------------- MOCK EMPLOYEE SALARY DATA ---------------- */
const employees = [
  {
    id: 'SSSPL001',
    name: 'Rajesh Kumar Singh',
    grossSalary: 100000,
    basic: 50000,
    pfEligible: true,
    esiEligible: false,
  },
  {
    id: 'SSSPL002',
    name: 'Priya Sharma',
    grossSalary: 85000,
    basic: 42000,
    pfEligible: true,
    esiEligible: true,
  },
  {
    id: 'SSSPL003',
    name: 'Amit Patel',
    grossSalary: 120000,
    basic: 60000,
    pfEligible: true,
    esiEligible: false,
  },
];

/* ---------------- COMPONENT ---------------- */
const HRPayrollProcess: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [month, setMonth] = useState('01-2026');
  const [payDays, setPayDays] = useState(26);
  const [lopDays, setLopDays] = useState(0);
  const [paymentMode, setPaymentMode] = useState('Bank');
  const [locked, setLocked] = useState(false);

  const employee = employees.find((e) => e.id === employeeId);

  /* ----------- CALCULATIONS ----------- */
  const perDaySalary = employee ? employee.grossSalary / 30 : 0;
  const lopAmount = lopDays * perDaySalary;
  const grossPayable = employee
    ? employee.grossSalary - lopAmount
    : 0;

  const pfEmployee =
    employee?.pfEligible ? employee.basic * 0.12 : 0;
  const pfEmployer =
    employee?.pfEligible ? employee.basic * 0.12 : 0;

  const esiEmployee =
    employee?.esiEligible ? grossPayable * 0.0075 : 0;
  const esiEmployer =
    employee?.esiEligible ? grossPayable * 0.0325 : 0;

  const professionalTax = 200;
  const incomeTax = grossPayable * 0.05;
  const tds = grossPayable * 0.02;

  const totalDeductions =
    pfEmployee +
    esiEmployee +
    professionalTax +
    incomeTax +
    tds;

  const netPay = grossPayable - totalDeductions;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Payroll Processing – HR</h1>

      {/* BASIC INFO */}
      <Card>
        <CardContent className="grid grid-cols-2 gap-4 p-4">
          <div>
            <Label>Employee *</Label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.id} – {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Salary Month *</Label>
            <Input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ATTENDANCE */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Pay Days</Label>
            <Input
              type="number"
              value={payDays}
              onChange={(e) => setPayDays(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>LOP Days</Label>
            <Input
              type="number"
              value={lopDays}
              onChange={(e) => setLopDays(Number(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      {/* DEDUCTIONS */}
      <Card>
        <CardHeader>
          <CardTitle>Deductions & Statutory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>PF (Employee)</span>
            <span>₹ {pfEmployee.toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span>ESI (Employee)</span>
            <span>₹ {esiEmployee.toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span>Professional Tax</span>
            <span>₹ {professionalTax}</span>
          </div>
          <div className="flex justify-between">
            <span>Income Tax</span>
            <span>₹ {incomeTax.toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span>TDS</span>
            <span>₹ {tds.toFixed(0)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total Deductions</span>
            <span className="text-destructive">
              ₹ {totalDeductions.toFixed(0)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* PAYMENT */}
      <Card>
        <CardHeader>
          <CardTitle>Net Pay</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Net Salary</span>
            <span className="text-success">
              ₹ {netPay.toFixed(0)}
            </span>
          </div>

          <div>
            <Label>Payment Mode</Label>
            <Select value={paymentMode} onValueChange={setPaymentMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank">Bank</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Cheque">Cheque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {locked && (
            <Badge className="badge-success">Payroll Locked</Badge>
          )}
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          <Calculator className="h-4 w-4 mr-2" />
          Preview Payslip
        </Button>
        <Button
          className="bg-accent"
          onClick={() => setLocked(true)}
        >
          <Lock className="h-4 w-4 mr-2" />
          Process & Lock Payroll
        </Button>
      </div>
    </div>
  );
};

export default HRPayrollProcess;
