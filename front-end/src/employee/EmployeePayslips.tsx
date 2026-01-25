// import React, { useState } from 'react';
// import {
//   Wallet,
//   Download,
//   Calendar,
//   IndianRupee,
//   FileText,
//   Eye,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Separator } from '@/components/ui/separator';

// // 🔹 MOCK: logged-in employee
// const loggedInEmployeeId = 'SSSPL001';

// // Mock payroll data (same as before)
// const payrollData = [
//   {
//     id: '1',
//     employeeId: 'SSSPL001',
//     month: 'December',
//     year: '2025',
//     payDays: 26,
//     grossSalary: 100000,
//     basicSalary: 50000,
//     hra: 25000,
//     specialAllowance: 15000,
//     conveyance: 5000,
//     medicalAllowance: 5000,
//     pfEmployee: 6000,
//     esicEmployee: 750,
//     professionalTax: 200,
//     tds: 5000,
//     totalDeductions: 11950,
//     netPay: 88050,
//     status: 'paid',
//     bankAccount: 'HDFC XXXXX1234',
//   },
// ];

// const formatCurrency = (amount: number) =>
//   new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(amount);

// const Payroll: React.FC = () => {
//   const [selectedMonth, setSelectedMonth] = useState('December');
//   const [selectedYear, setSelectedYear] = useState('2025');
//   const [selectedPayslip, setSelectedPayslip] =
//     useState<typeof payrollData[0] | null>(null);

//   // 🔹 Only employee’s records
//   const employeePayroll = payrollData.filter(
//     (p) =>
//       p.employeeId === loggedInEmployeeId &&
//       p.month === selectedMonth &&
//       p.year === selectedYear
//   );

//   const latestPayslip = employeePayroll[0];

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'paid':
//         return <Badge className="badge-success">Paid</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   return (
//     <div className="space-y-6 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">My Payslips</h1>
//           <p className="text-muted-foreground">
//             View and download your salary details
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <Select value={selectedMonth} onValueChange={setSelectedMonth}>
//             <SelectTrigger className="w-[130px]">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
//                 (month) => (
//                   <SelectItem key={month} value={month}>
//                     {month}
//                   </SelectItem>
//                 )
//               )}
//             </SelectContent>
//           </Select>

//           <Select value={selectedYear} onValueChange={setSelectedYear}>
//             <SelectTrigger className="w-[100px]">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               {['2024', '2025', '2026'].map((year) => (
//                 <SelectItem key={year} value={year}>
//                   {year}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Summary */}
//       {latestPayslip && (
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <Card>
//             <CardContent className="p-6">
//               <p className="text-sm text-muted-foreground">Gross Salary</p>
//               <p className="text-2xl font-bold">
//                 {formatCurrency(latestPayslip.grossSalary)}
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <p className="text-sm text-muted-foreground">Total Deductions</p>
//               <p className="text-2xl font-bold text-destructive">
//                 -{formatCurrency(latestPayslip.totalDeductions)}
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6">
//               <p className="text-sm text-muted-foreground">Net Pay</p>
//               <p className="text-2xl font-bold text-success">
//                 {formatCurrency(latestPayslip.netPay)}
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* Payslip Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Payslip History</CardTitle>
//           <CardDescription>
//             Salary records for selected period
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Month</TableHead>
//                 <TableHead>Pay Days</TableHead>
//                 <TableHead className="text-right">Net Pay</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {employeePayroll.map((record) => (
//                 <TableRow key={record.id}>
//                   <TableCell>
//                     {record.month} {record.year}
//                   </TableCell>
//                   <TableCell>{record.payDays}</TableCell>
//                   <TableCell className="text-right font-bold">
//                     {formatCurrency(record.netPay)}
//                   </TableCell>
//                   <TableCell>{getStatusBadge(record.status)}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setSelectedPayslip(record)}
//                     >
//                       <Eye className="h-4 w-4 mr-1" />
//                       View
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Payslip Dialog */}
//       <Dialog open={!!selectedPayslip} onOpenChange={() => setSelectedPayslip(null)}>
//         <DialogContent className="max-w-xl">
//           {selectedPayslip && (
//             <>
//               <DialogHeader>
//                 <DialogTitle>
//                   Payslip – {selectedPayslip.month} {selectedPayslip.year}
//                 </DialogTitle>
//                 <DialogDescription>
//                   Net Pay: {formatCurrency(selectedPayslip.netPay)}
//                 </DialogDescription>
//               </DialogHeader>

//               <div className="space-y-3">
//                 <Separator />
//                 <div className="flex justify-between">
//                   <span>Basic</span>
//                   <span>{formatCurrency(selectedPayslip.basicSalary)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>HRA</span>
//                   <span>{formatCurrency(selectedPayslip.hra)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Allowances</span>
//                   <span>
//                     {formatCurrency(
//                       selectedPayslip.specialAllowance +
//                         selectedPayslip.conveyance +
//                         selectedPayslip.medicalAllowance
//                     )}
//                   </span>
//                 </div>
//                 <Separator />
//                 <div className="flex justify-between font-semibold">
//                   <span>Deductions</span>
//                   <span className="text-destructive">
//                     {formatCurrency(selectedPayslip.totalDeductions)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex justify-end pt-4">
//                 <Button>
//                   <Download className="h-4 w-4 mr-2" />
//                   Download Payslip
//                 </Button>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Payroll;



import React, { useState } from 'react';
import {
  Download,
  Eye,
  Printer,
  Mail,
  Calendar,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* 🔐 MOCK LOGGED-IN EMPLOYEE */
const LOGGED_IN_EMPLOYEE_ID = 'SSSPL001';

/* 📄 MOCK PAYSLIPS (FILTERED BY EMPLOYEE ID) */
const payslips = [
  {
    id: '1',
    employeeId: 'SSSPL001',
    month: 'January',
    year: '2026',
    earnings: {
      basic: 50000,
      hra: 25000,
      special: 15000,
      conveyance: 5000,
      medical: 5000,
    },
    deductions: {
      pf: 6000,
      esi: 0,
      professionalTax: 200,
      incomeTax: 5000,
      tds: 2000,
    },
    netPay: 81800,
    status: 'Paid',
  },
  {
    id: '2',
    employeeId: 'SSSPL001',
    month: 'February',
    year: '2026',
    earnings: {
      basic: 50000,
      hra: 25000,
      special: 15000,
      conveyance: 5000,
      medical: 5000,
    },
    deductions: {
      pf: 6000,
      esi: 0,
      professionalTax: 200,
      incomeTax: 4800,
      tds: 1800,
    },
    netPay: 82200,
    status: 'Paid',
  },
];

/* 💰 FORMAT INR */
const formatINR = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

/* 🧾 COMPONENT */
const EmployeePayslips: React.FC = () => {
  const [selectedPayslip, setSelectedPayslip] =
    useState<typeof payslips[0] | null>(null);
  const [year, setYear] = useState('2026');

  const employeePayslips = payslips.filter(
    (p) =>
      p.employeeId === LOGGED_IN_EMPLOYEE_ID &&
      p.year === year
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Payslips</h1>
          <p className="text-muted-foreground">
            View and download your salary slips
          </p>
        </div>

        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['2025', '2026', '2027'].map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* PAYSLIP TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Payslip History</CardTitle>
          <CardDescription>
            Salary records for selected year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">
                  Net Pay
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeePayslips.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {p.month} {p.year}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatINR(p.netPay)}
                  </TableCell>
                  <TableCell>
                    <Badge className="badge-success">
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedPayslip(p)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* PAYSLIP VIEW DIALOG */}
      <Dialog
        open={!!selectedPayslip}
        onOpenChange={() => setSelectedPayslip(null)}
      >
        <DialogContent className="max-w-3xl">
          {selectedPayslip && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Payslip – {selectedPayslip.month}{' '}
                  {selectedPayslip.year}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6 mt-4">
                {/* EARNINGS */}
                <div>
                  <h3 className="font-semibold mb-2">
                    Earnings
                  </h3>
                  {Object.entries(
                    selectedPayslip.earnings
                  ).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between text-sm"
                    >
                      <span className="capitalize">{k}</span>
                      <span>{formatINR(v)}</span>
                    </div>
                  ))}
                </div>

                {/* DEDUCTIONS */}
                <div>
                  <h3 className="font-semibold mb-2">
                    Deductions
                  </h3>
                  {Object.entries(
                    selectedPayslip.deductions
                  ).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between text-sm"
                    >
                      <span className="capitalize">{k}</span>
                      <span className="text-destructive">
                        {formatINR(v)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Net Pay</span>
                <span className="text-success">
                  {formatINR(selectedPayslip.netPay)}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button className="bg-accent">
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeePayslips;

