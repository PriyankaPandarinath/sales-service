import React, { useState } from 'react';
import {
  IndianRupee,
  Plus,
  Calculator,
  Save,
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
import { Switch } from '@/components/ui/switch';

/* ---------------- MOCK EMPLOYEES (20) ---------------- */
const employees = [
  { id: 'SSSPL001', name: 'Rajesh Kumar Singh' },
  { id: 'SSSPL002', name: 'Priya Sharma' },
  { id: 'SSSPL003', name: 'Amit Patel' },
  { id: 'SSSPL004', name: 'Sneha Reddy' },
  { id: 'SSSPL005', name: 'Vikram Joshi' },
  { id: 'SSSPL006', name: 'Neha Verma' },
  { id: 'SSSPL007', name: 'Suresh Rao' },
  { id: 'SSSPL008', name: 'Anjali Mehta' },
  { id: 'SSSPL009', name: 'Kiran Naik' },
  { id: 'SSSPL010', name: 'Pooja Kulkarni' },
];

/* ---------------- TYPES ---------------- */
interface SalaryStructure {
  ctc: number;
  basic: number;
  da: number;
  hra: number;
  special: number;
  conveyance: number;
  medical: number;
  other: number;
  pfEligible: boolean;
  esiEligible: boolean;
  bonusEligible: boolean;
  incentiveEligible: boolean;
  gratuityEligible: boolean;
  professionalTax: boolean;
  incomeTax: boolean;
  tds: boolean;
  shortPaid: number;
  excessPaid: number;
  arrears: number;
  salaryAdvance: number;
}

/* ---------------- COMPONENT ---------------- */
const HRSalaryStructure: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [salary, setSalary] = useState<SalaryStructure>({
    ctc: 0,
    basic: 0,
    da: 0,
    hra: 0,
    special: 0,
    conveyance: 0,
    medical: 0,
    other: 0,
    pfEligible: true,
    esiEligible: false,
    bonusEligible: false,
    incentiveEligible: false,
    gratuityEligible: true,
    professionalTax: true,
    incomeTax: true,
    tds: true,
    shortPaid: 0,
    excessPaid: 0,
    arrears: 0,
    salaryAdvance: 0,
  });

  /* ----------- CALCULATIONS ----------- */
  const grossSalary =
    salary.basic +
    salary.da +
    salary.hra +
    salary.special +
    salary.conveyance +
    salary.medical +
    salary.other;

  const pfEmployee = salary.pfEligible ? salary.basic * 0.12 : 0;
  const esiEmployee = salary.esiEligible ? grossSalary * 0.0075 : 0;
  const professionalTax = salary.professionalTax ? 200 : 0;

  const totalDeductions =
    pfEmployee +
    esiEmployee +
    professionalTax +
    salary.salaryAdvance +
    salary.excessPaid;

  const netPay =
    grossSalary -
    totalDeductions +
    salary.arrears -
    salary.shortPaid;

  const updateField = (key: keyof SalaryStructure, value: any) => {
    setSalary({ ...salary, [key]: value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Salary Structure – HR</h1>

      {/* EMPLOYEE SELECT */}
      <Card>
        <CardContent className="p-4">
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
        </CardContent>
      </Card>

      {/* SALARY COMPONENTS */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {[
            ['CTC', 'ctc'],
            ['Basic Salary', 'basic'],
            ['DA / VDA', 'da'],
            ['HRA', 'hra'],
            ['Special Allowance', 'special'],
            ['Conveyance', 'conveyance'],
            ['Medical Allowance', 'medical'],
            ['Other Allowances', 'other'],
          ].map(([label, key]) => (
            <div key={key}>
              <Label>{label}</Label>
              <Input
                type="number"
                value={(salary as any)[key]}
                onChange={(e) =>
                  updateField(key as keyof SalaryStructure, Number(e.target.value))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ELIGIBILITY */}
      <Card>
        <CardHeader>
          <CardTitle>Eligibility</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {[
            ['PF', 'pfEligible'],
            ['ESI', 'esiEligible'],
            ['Bonus', 'bonusEligible'],
            ['Incentive', 'incentiveEligible'],
            ['Gratuity', 'gratuityEligible'],
            ['Professional Tax', 'professionalTax'],
            ['Income Tax', 'incomeTax'],
            ['TDS', 'tds'],
          ].map(([label, key]) => (
            <div key={key} className="flex items-center justify-between">
              <Label>{label}</Label>
              <Switch
                checked={(salary as any)[key]}
                onCheckedChange={(v) =>
                  updateField(key as keyof SalaryStructure, v)
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ADJUSTMENTS */}
      <Card>
        <CardHeader>
          <CardTitle>Adjustments</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {[
            ['Short Paid (Last Month)', 'shortPaid'],
            ['Excess Paid (Last Month)', 'excessPaid'],
            ['Arrears', 'arrears'],
            ['Salary Advance', 'salaryAdvance'],
          ].map(([label, key]) => (
            <div key={key}>
              <Label>{label}</Label>
              <Input
                type="number"
                value={(salary as any)[key]}
                onChange={(e) =>
                  updateField(key as keyof SalaryStructure, Number(e.target.value))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* SUMMARY */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Gross Salary</span>
            <span>₹ {grossSalary}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Deductions</span>
            <span className="text-destructive">₹ {totalDeductions}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Net Pay</span>
            <span className="text-success">₹ {netPay}</span>
          </div>
        </CardContent>
      </Card>

      {/* ACTION */}
      <div className="flex justify-end">
        <Button className="bg-accent">
          <Save className="h-4 w-4 mr-2" />
          Save Salary Structure
        </Button>
      </div>
    </div>
  );
};

export default HRSalaryStructure;
