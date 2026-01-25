// AdminPayroll.tsx - Branch-specific view for Admin role
// Limited to viewing payrolls for assigned branch (e.g., Hyderabad Main)
// No editing, no processing - focus on branch reports and summaries

import React, { useEffect, useState } from 'react';
import {
  Eye,
  Download,
  Calendar,
  IndianRupee,
  Users,
  BarChart,
  FileCheck,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// 🔒 MOCK: Logged-in Admin for a specific branch
const loggedInAdminBranch = 'Hyderabad Main'; // Fixed for demo

// 📊 MOCK Data: Extended with branches
const initialMonthlyPayrollData = [
  // Hyderabad Main branch data
  {
    id: '1',
    employeeId: 'SSSPL001',
    employeeName: 'Rajesh Kumar Singh',
    branch: 'Hyderabad Main',
    month: 'January',
    year: '2026',
    payDays: 26,
    lopDays: 0,
    grossSalary: 100000,
    totalDeductions: 13200,
    netPay: 86800,
    payslipGenerated: true,
    paymentMode: 'Bank',
    bankAccountNumber: 'HDFCXXXX1234',
    ifscCode: 'HDFC0001234',
    branchName: 'Hyderabad Main',
    branchAddress: 'Somajiguda, Hyderabad',
    aadhar: 'XXXX-XXXX-XXXX',
    pan: 'ABCDE1234F',
    uan: '100123456789',
    pf: 'PF123456',
    esi: '',
    status: 'Processed',
    designation: 'Senior Engineer',
    department: 'Engineering',
  },
  {
    id: '3',
    employeeId: 'SSSPL001',
    employeeName: 'Rajesh Kumar Singh',
    branch: 'Hyderabad Main',
    month: 'February',
    year: '2026',
    payDays: 24,
    lopDays: 0,
    grossSalary: 100000,
    totalDeductions: 13200,
    netPay: 86800,
    payslipGenerated: false,
    paymentMode: 'Bank',
    bankAccountNumber: 'HDFCXXXX1234',
    ifscCode: 'HDFC0001234',
    branchName: 'Hyderabad Main',
    branchAddress: 'Somajiguda, Hyderabad',
    aadhar: 'XXXX-XXXX-XXXX',
    pan: 'ABCDE1234F',
    uan: '100123456789',
    pf: 'PF123456',
    esi: '',
    status: 'Pending',
    designation: 'Senior Engineer',
    department: 'Engineering',
  },
  // Other branches (for super admin, but filtered here)
  {
    id: '2',
    employeeId: 'SSSPL002',
    employeeName: 'Priya Sharma',
    branch: 'Hyderabad Central',
    month: 'January',
    year: '2026',
    payDays: 26,
    lopDays: 1,
    grossSalary: 75000,
    totalDeductions: 9950,
    netPay: 65050,
    payslipGenerated: false,
    paymentMode: 'Bank',
    bankAccountNumber: 'SBINXXXX5678',
    ifscCode: 'SBIN0005678',
    branchName: 'Hyderabad Central',
    branchAddress: 'Somajiguda, Hyderabad',
    aadhar: 'YYYY-YYYY-YYYY',
    pan: 'FGHIJ5678K',
    uan: '100987654321',
    pf: 'PF987654',
    esi: 'ESI123456',
    status: 'Pending',
    designation: 'Junior Analyst',
    department: 'Finance',
  },
  // Add more as needed
];

const initialDeductionsData = {
  // Same as before, keyed by employee-month-year
  'SSSPL001-January-2026': {
    pfEmployee: 6000,
    pfEmployer: 6000,
    esicEmployee: 0,
    esicEmployer: 0,
    professionalTax: 200,
    incomeTax: 5000,
    tds: 2000,
    labourWelfareFund: 0,
    salaryAdvance: 0,
    tourAdvance: 0,
    medicalAdvance: 0,
    festivalAdvance: 0,
    excessPaidLastMonth: 0,
    employeeGroupHealth: 0,
    employeeGroupAccidental: 0,
  },
  // ... (include others)
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const AdminPayroll: React.FC = () => {
  const [monthlyPayrollData] = useState(initialMonthlyPayrollData);
  const [deductionsData] = useState(initialDeductionsData);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedEmployee, setSelectedEmployee] = useState<typeof monthlyPayrollData[0] | null>(null);
  const [activeTab, setActiveTab] = useState('processing');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter for admin's branch only
  const filteredPayroll = monthlyPayrollData.filter(
    p =>
      p.branch === loggedInAdminBranch &&
      p.month === selectedMonth &&
      p.year === selectedYear &&
      (p.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate summaries (branch-specific)
  const totalEmployees = filteredPayroll.length;
  const totalGross = filteredPayroll.reduce((sum, p) => sum + p.grossSalary, 0);
  const totalDeductions = filteredPayroll.reduce((sum, p) => sum + p.totalDeductions, 0);
  const totalNet = filteredPayroll.reduce((sum, p) => sum + p.netPay, 0);

  // Reports (branch-specific)
  const payrollSummary = [
    { month: `${selectedMonth} ${selectedYear} (${loggedInAdminBranch})`, totalEmployees, grossSalary: totalGross, totalDeductions, netPay: totalNet },
  ];

  const employeePayslipReport = filteredPayroll.map(p => ({
    employeeId: p.employeeId,
    name: p.employeeName,
    month: `${p.month} ${p.year}`,
    gross: p.grossSalary,
    deductions: p.totalDeductions,
    netPay: p.netPay,
    payslip: p.payslipGenerated ? 'Generated' : 'Pending',
  }));

  const statutoryCompliance = [
    {
      month: `${selectedMonth} ${selectedYear}`,
      pfAmount: filteredPayroll.reduce((sum, p) => {
        const dedKey = `${p.employeeId}-${p.month}-${p.year}`;
        const ded = deductionsData[dedKey as keyof typeof deductionsData];
        return sum + (ded ? ded.pfEmployee + ded.pfEmployer : 0);
      }, 0),
      esicAmount: filteredPayroll.reduce((sum, p) => {
        const dedKey = `${p.employeeId}-${p.month}-${p.year}`;
        const ded = deductionsData[dedKey as keyof typeof deductionsData];
        return sum + (ded ? ded.esicEmployee + ded.esicEmployer : 0);
      }, 0),
      pt: filteredPayroll.reduce((sum, p) => {
        const dedKey = `${p.employeeId}-${p.month}-${p.year}`;
        const ded = deductionsData[dedKey as keyof typeof deductionsData];
        return sum + (ded ? ded.professionalTax : 0);
      }, 0),
      tds: filteredPayroll.reduce((sum, p) => {
        const dedKey = `${p.employeeId}-${p.month}-${p.year}`;
        const ded = deductionsData[dedKey as keyof typeof deductionsData];
        return sum + (ded ? ded.tds : 0);
      }, 0),
      status: 'Compliant',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Processed':
        return <Badge className="bg-green-500">Processed</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };


  useEffect(() => {
    // Reset to first tab on month/year change
    setActiveTab('payroll-view');
  }, [selectedMonth, selectedYear]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Payroll View - {loggedInAdminBranch}</h1>
          <p className="text-muted-foreground">View branch-specific payroll summaries and reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['2024', '2025', '2026', '2027'].map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground flex items-center"><Users className="h-4 w-4 mr-2" /> Total Employees</p>
            <p className="text-2xl font-bold">{totalEmployees}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground flex items-center"><IndianRupee className="h-4 w-4 mr-2" /> Gross Salary</p>
            <p className="text-2xl font-bold">{formatCurrency(totalGross)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground flex items-center"><IndianRupee className="h-4 w-4 mr-2" /> Total Deductions</p>
            <p className="text-2xl font-bold text-red-600">-{formatCurrency(totalDeductions)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground flex items-center"><IndianRupee className="h-4 w-4 mr-2" /> Net Pay</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(totalNet)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs: No structures/processing edits, only view and reports */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="payroll-view">Payroll View</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Payroll View Tab - View only */}
        <TabsContent value="payroll-view">
          <Card>
            <CardHeader>
              <CardTitle>Branch Payroll Overview</CardTitle>
              <CardDescription>View payroll details for {selectedMonth} {selectedYear} in {loggedInAdminBranch}. Use search to filter.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-64 mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Pay Days / LOP</TableHead>
                    <TableHead className="text-right">Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayroll.map(record => (
                    <TableRow key={record.id}>
                      <TableCell>{record.employeeId}</TableCell>
                      <TableCell>{record.employeeName}</TableCell>
                      <TableCell>{record.payDays} / {record.lopDays}</TableCell>
                      <TableCell className="text-right font-bold">{formatCurrency(record.netPay)}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedEmployee(record)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        {/* {record.payslipGenerated && (
                          <Button variant="ghost" size="sm" onClick={() => console.log('Download payslip for', record.employeeId)}>
                            <Download className="h-4 w-4 mr-1" /> Payslip
                          </Button>
                        )} */}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPayroll.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No employees found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <div className="space-y-6">
            {/* Similar to HR, but branch-specific */}
            <Card>
              <CardHeader>
                <CardTitle>Payroll Summary Report - {loggedInAdminBranch}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Total Employees</TableHead>
                      <TableHead>Gross Salary</TableHead>
                      <TableHead>Total Deductions</TableHead>
                      <TableHead>Net Pay</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollSummary.map(report => (
                      <TableRow key={report.month}>
                        <TableCell>{report.month}</TableCell>
                        <TableCell>{report.totalEmployees}</TableCell>
                        <TableCell>{formatCurrency(report.grossSalary)}</TableCell>
                        <TableCell>{formatCurrency(report.totalDeductions)}</TableCell>
                        <TableCell>{formatCurrency(report.netPay)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Employee Payslip Report */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Employee Payslip Report</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Gross</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead>Payslip</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeePayslipReport.map((report, index) => (
                      <TableRow key={`${report.employeeId}-${report.month}-${index}`}>
                        <TableCell>{report.employeeId}</TableCell>
                        <TableCell>{report.name}</TableCell>
                        <TableCell>{report.month}</TableCell>
                        <TableCell>{formatCurrency(report.gross)}</TableCell>
                        <TableCell>{formatCurrency(report.deductions)}</TableCell>
                        <TableCell>{formatCurrency(report.netPay)}</TableCell>
                        <TableCell>{report.payslip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card> */}

            {/* Statutory Compliance Report */}
            <Card>
              <CardHeader>
                <CardTitle>Statutory Compliance Report</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>PF Amount</TableHead>
                      <TableHead>ESIC Amount</TableHead>
                      <TableHead>PT</TableHead>
                      <TableHead>TDS</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statutoryCompliance.map((report, index) => (
                      <TableRow key={`${report.month}-${index}`}>
                        <TableCell>{report.month}</TableCell>
                        <TableCell>{formatCurrency(report.pfAmount)}</TableCell>
                        <TableCell>{formatCurrency(report.esicAmount)}</TableCell>
                        <TableCell>{formatCurrency(report.pt)}</TableCell>
                        <TableCell>{formatCurrency(report.tds)}</TableCell>
                        <TableCell>{report.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Employee Detail Dialog - View only */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedEmployee && (
            <>
              <DialogHeader>
                <DialogTitle>Payslip Details – {selectedEmployee.employeeName} – {selectedEmployee.month} {selectedEmployee.year}</DialogTitle>
                <DialogDescription>Branch: {selectedEmployee.branch}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-3 gap-6">
                {/* Earnings, Deductions, Payment & Statutory - same as HR */}
                <div>
                  <h3 className="font-semibold mb-2">Earnings</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Gross Salary</span><span>{formatCurrency(selectedEmployee.grossSalary)}</span></div>
                    {/* Add structure fetch if needed, but for admin, assume view-only */}
                  </div>
                </div>
                {/* Deductions */}
                <div>
                  <h3 className="font-semibold mb-2">Deductions</h3>
                  <div className="space-y-2 text-sm">
                    {/* Dynamic from deductionsData */}
                    <div className="flex justify-between"><span>Total Deductions</span><span>{formatCurrency(selectedEmployee.totalDeductions)}</span></div>
                  </div>
                </div>
                 <div>
                  <h3 className="font-semibold mb-2">Net Pay</h3>
                  <div className="space-y-2 text-sm">
                    {/* Dynamic from deductionsData */}
                    <div className="flex justify-between"><span>Net Pay</span><span>{formatCurrency(selectedEmployee.netPay)}</span></div>
                  </div>
                </div>
                {/* Payment & Statutory */}
                {/* <div> */}
                  {/* <h3 className="font-semibold mb-2">Payment & Statutory Details</h3> */}
                  {/* <div className="space-y-2 text-sm"> */}
                    {/* <div><Label>Branch</Label><Input value={selectedEmployee.branch} readOnly /></div> */}
                    {/* Other fields */}
                  {/* </div> */}
                {/* </div> */}
              </div>

              <Separator className="my-4" />

              {/* <div className="flex justify-end gap-2">
                {selectedEmployee.payslipGenerated && (
                  <Button onClick={() => console.log('Download PDF for', selectedEmployee.employeeId)}>
                    <Download className="h-4 w-4 mr-2" /> Download PDF
                  </Button>
                )}
              </div> */}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminPayroll;