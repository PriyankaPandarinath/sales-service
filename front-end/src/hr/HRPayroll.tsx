import React, { useState } from 'react';
import {
  Download,
  Eye,
  Edit,
  Save,
  Lock,
  Unlock,
  Calendar,
  IndianRupee,
  FileText,
  Users,
  BarChart,
  FileCheck,
  X,
  Search,
  CheckSquare,
  Square,
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
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// 🔒 MOCK: Logged-in HR/Admin
const loggedInRole = 'HR';

// 📊 MOCK Data: Use state for mutability
const initialEmployeeSalaryStructures = [
  {
    employeeId: 'SSSPL001',
    employeeName: 'Rajesh Kumar Singh',
    ctc: 1200000,
    grossSalary: 100000,
    basicSalary: 50000,
    daVda: 0,
    hra: 25000,
    specialAllowance: 15000,
    conveyanceAllowance: 5000,
    medicalAllowance: 5000,
    otherAllowances: 0,
    groupHealthInsurance: 0,
    groupAccidentalInsurance: 0,
    travelReimbursementEligibility: true,
    bonusEligibility: true,
    incentiveEligibility: true,
    gratuityEligibility: true,
    pfEligibility: true,
    professionalTax: true,
    incomeTax: true,
    tds: true,
    esiEligibility: false,
    shortPaidLastMonth: 0,
    excessPaidLastMonth: 0,
    arrears: 0,
    salaryAdvance: 0,
  },
  {
    employeeId: 'SSSPL002',
    employeeName: 'Priya Sharma',
    ctc: 900000,
    grossSalary: 75000,
    basicSalary: 37500,
    daVda: 0,
    hra: 18750,
    specialAllowance: 11250,
    conveyanceAllowance: 3750,
    medicalAllowance: 3750,
    otherAllowances: 0,
    groupHealthInsurance: 0,
    groupAccidentalInsurance: 0,
    travelReimbursementEligibility: false,
    bonusEligibility: true,
    incentiveEligibility: false,
    gratuityEligibility: true,
    pfEligibility: true,
    professionalTax: true,
    incomeTax: true,
    tds: true,
    esiEligibility: true,
    shortPaidLastMonth: 0,
    excessPaidLastMonth: 500,
    arrears: 1000,
    salaryAdvance: 2000,
  },
  // Add more dummy employees for testing filters
  {
    employeeId: 'SSSPL003',
    employeeName: 'Amit Patel',
    ctc: 600000,
    grossSalary: 50000,
    basicSalary: 25000,
    daVda: 0,
    hra: 12500,
    specialAllowance: 7500,
    conveyanceAllowance: 2500,
    medicalAllowance: 2500,
    otherAllowances: 0,
    groupHealthInsurance: 0,
    groupAccidentalInsurance: 0,
    travelReimbursementEligibility: true,
    bonusEligibility: false,
    incentiveEligibility: true,
    gratuityEligibility: true,
    pfEligibility: true,
    professionalTax: true,
    incomeTax: true,
    tds: true,
    esiEligibility: false,
    shortPaidLastMonth: 0,
    excessPaidLastMonth: 0,
    arrears: 0,
    salaryAdvance: 0,
  },
];

const initialMonthlyPayrollData = [
  {
    id: '1',
    employeeId: 'SSSPL001',
    employeeName: 'Rajesh Kumar Singh',
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
    id: '2',
    employeeId: 'SSSPL002',
    employeeName: 'Priya Sharma',
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
  {
    id: '5',
    employeeId: 'SSSPL003',
    employeeName: 'Amit Patel',
    month: 'January',
    year: '2026',
    payDays: 26,
    lopDays: 0,
    grossSalary: 50000,
    totalDeductions: 6600,
    netPay: 43400,
    payslipGenerated: false,
    paymentMode: 'Bank',
    bankAccountNumber: 'ICICXXXX9012',
    ifscCode: 'ICIC0009012',
    branchName: 'Hyderabad East',
    branchAddress: 'Somajiguda, Hyderabad',
    aadhar: 'ZZZZ-ZZZZ-ZZZZ',
    pan: 'KLMNO9012P',
    uan: '101112131415',
    pf: 'PF901234',
    esi: '',
    status: 'Pending',
    designation: 'Sales Executive',
    department: 'Sales',
  },
  // February data
  {
    id: '3',
    employeeId: 'SSSPL001',
    employeeName: 'Rajesh Kumar Singh',
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
  {
    id: '4',
    employeeId: 'SSSPL002',
    employeeName: 'Priya Sharma',
    month: 'February',
    year: '2026',
    payDays: 24,
    lopDays: 0,
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
  {
    id: '6',
    employeeId: 'SSSPL003',
    employeeName: 'Amit Patel',
    month: 'February',
    year: '2026',
    payDays: 24,
    lopDays: 0,
    grossSalary: 50000,
    totalDeductions: 6600,
    netPay: 43400,
    payslipGenerated: false,
    paymentMode: 'Bank',
    bankAccountNumber: 'ICICXXXX9012',
    ifscCode: 'ICIC0009012',
    branchName: 'Hyderabad East',
    branchAddress: 'Somajiguda, Hyderabad',
    aadhar: 'ZZZZ-ZZZZ-ZZZZ',
    pan: 'KLMNO9012P',
    uan: '101112131415',
    pf: 'PF901234',
    esi: '',
    status: 'Pending',
    designation: 'Sales Executive',
    department: 'Sales',
  },
];

const initialDeductionsData = {
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
  'SSSPL002-January-2026': {
    pfEmployee: 4500,
    pfEmployer: 4500,
    esicEmployee: 750,
    esicEmployer: 1875,
    professionalTax: 200,
    incomeTax: 3000,
    tds: 1500,
    labourWelfareFund: 0,
    salaryAdvance: 2000,
    tourAdvance: 0,
    medicalAdvance: 0,
    festivalAdvance: 0,
    excessPaidLastMonth: 500,
    employeeGroupHealth: 0,
    employeeGroupAccidental: 0,
  },
  'SSSPL003-January-2026': {
    pfEmployee: 3000,
    pfEmployer: 3000,
    esicEmployee: 0,
    esicEmployer: 0,
    professionalTax: 200,
    incomeTax: 2000,
    tds: 1000,
    labourWelfareFund: 0,
    salaryAdvance: 0,
    tourAdvance: 0,
    medicalAdvance: 0,
    festivalAdvance: 0,
    excessPaidLastMonth: 0,
    employeeGroupHealth: 0,
    employeeGroupAccidental: 0,
  },
  'SSSPL001-February-2026': {
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
  'SSSPL002-February-2026': {
    pfEmployee: 4500,
    pfEmployer: 4500,
    esicEmployee: 750,
    esicEmployer: 1875,
    professionalTax: 200,
    incomeTax: 3000,
    tds: 1500,
    labourWelfareFund: 0,
    salaryAdvance: 0,
    tourAdvance: 0,
    medicalAdvance: 0,
    festivalAdvance: 0,
    excessPaidLastMonth: 0,
    employeeGroupHealth: 0,
    employeeGroupAccidental: 0,
  },
  'SSSPL003-February-2026': {
    pfEmployee: 3000,
    pfEmployer: 3000,
    esicEmployee: 0,
    esicEmployer: 0,
    professionalTax: 200,
    incomeTax: 2000,
    tds: 1000,
    labourWelfareFund: 0,
    salaryAdvance: 0,
    tourAdvance: 0,
    medicalAdvance: 0,
    festivalAdvance: 0,
    excessPaidLastMonth: 0,
    employeeGroupHealth: 0,
    employeeGroupAccidental: 0,
  },
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const HRPayroll: React.FC = () => {
  const [employeeSalaryStructures, setEmployeeSalaryStructures] = useState(initialEmployeeSalaryStructures);
  const [monthlyPayrollData, setMonthlyPayrollData] = useState(initialMonthlyPayrollData);
  const [deductionsData, setDeductionsData] = useState(initialDeductionsData);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedEmployee, setSelectedEmployee] = useState<(typeof monthlyPayrollData)[0] | null>(null);
  const [selectedStructure, setSelectedStructure] = useState<(typeof employeeSalaryStructures)[0] | null>(null);

  const [editingStatutory, setEditingStatutory] =
  useState<any | null>(null);

  const [selectedStatutoryEmployee, setSelectedStatutoryEmployee] =
  useState<(typeof employeeSalaryStructures)[0] | null>(null);

  const [editingStructure, setEditingStructure] = useState<Partial<(typeof employeeSalaryStructures)[0]> | null>(null);
  const [payrollLocked, setPayrollLocked] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState('processing');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]); // For bulk selection

  const monthKey = `${selectedMonth}-${selectedYear}`;
  const isLocked = payrollLocked[monthKey] || false;

  // Filter payroll for selected month/year and search term
  const filteredPayroll = monthlyPayrollData.filter(
    p =>
      p.month === selectedMonth &&
      p.year === selectedYear &&
      (p.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate summaries
  const totalEmployees = filteredPayroll.length;
  const totalGross = filteredPayroll.reduce((sum, p) => sum + p.grossSalary, 0);
  const totalDeductions = filteredPayroll.reduce((sum, p) => sum + p.totalDeductions, 0);
  const totalNet = filteredPayroll.reduce((sum, p) => sum + p.netPay, 0);

  // Reports (dynamic for selected month)
  const payrollSummary = [
    { month: `${selectedMonth} ${selectedYear}`, totalEmployees, grossSalary: totalGross, totalDeductions, netPay: totalNet },
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

  const handleProcessPayroll = (employeeIds: string[]) => {
    setMonthlyPayrollData(prev =>
      prev.map(p =>
        employeeIds.includes(p.employeeId) &&
        p.month === selectedMonth &&
        p.year === selectedYear
          ? { ...p, status: 'Processed', payslipGenerated: true }
          : p
      )
    );
    setSelectedEmployees([]);
  };


  const handleStatutoryEditStructure = (employee: any) => {
  const key = `${employee.employeeId}-${selectedMonth}-${selectedYear}`;

  setSelectedStatutoryEmployee(employee);
  setEditingStatutory({
    ...(deductionsData[key] || {
      pfEmployee: 0,
      pfEmployer: 0,
      esicEmployee: 0,
      esicEmployer: 0,
      professionalTax: 0,
      incomeTax: 0,
      tds: 0,
    }),
  });
};


const handleSaveStatutory = () => {
  if (!selectedStatutoryEmployee || !editingStatutory) return;

  const key = `${selectedStatutoryEmployee.employeeId}-${selectedMonth}-${selectedYear}`;

  setDeductionsData(prev => ({
    ...prev,
    [key]: editingStatutory,
  }));

  setSelectedStatutoryEmployee(null);
  setEditingStatutory(null);
};



  const handleLockPayroll = () => {
    const newLocked = !isLocked;
    setPayrollLocked(prev => ({ ...prev, [monthKey]: newLocked }));
    if (newLocked) {
      // Auto process all pending
      const pendingIds = filteredPayroll
        .filter(p => p.status === 'Pending')
        .map(p => p.employeeId);
      handleProcessPayroll(pendingIds);
    }
  };

  const handleEditStructure = (struct: (typeof employeeSalaryStructures)[0]) => {
    setSelectedStructure(struct);
    setEditingStructure(struct);
  };

  const handleSaveStructure = () => {
    if (editingStructure && selectedStructure) {
      setEmployeeSalaryStructures(prev =>
        prev.map(s =>
          s.employeeId === selectedStructure.employeeId ? { ...s, ...editingStructure } : s
        )
      );
      // Simulate update to payroll (e.g., recalculate gross)
      setMonthlyPayrollData(prev =>
        prev.map(p =>
          p.employeeId === selectedStructure.employeeId
            ? { ...p, grossSalary: editingStructure.grossSalary || p.grossSalary }
            : p
        )
      );
      setSelectedStructure(null);
      setEditingStructure(null);
    }
  };

  const handleStructureChange = (field: string, value: any) => {
    setEditingStructure(prev => ({ ...prev, [field]: value }));
  };

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

  const toggleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedEmployees.length === filteredPayroll.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredPayroll.map(p => p.employeeId));
    }
  };

  const generatePayslip = (employee: (typeof monthlyPayrollData)[0]) => {
    setMonthlyPayrollData(prev =>
      prev.map(p =>
        p.id === employee.id ? { ...p, payslipGenerated: true } : p
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">HR Payroll Management</h1>
          <p className="text-muted-foreground">Process payroll, generate payslips, and view reports</p>
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
          {/* <Button onClick={handleLockPayroll} variant={isLocked ? 'destructive' : 'default'} disabled={filteredPayroll.length === 0}>
            {isLocked ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
            {isLocked ? 'Unlock Payroll' : 'Lock & Generate All'}
          </Button> */}
        </div>
      </div>

      {/* Summary Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
      </div> */}

      {/* Tabs for Sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="processing">Payroll Processing</TabsTrigger>
          <TabsTrigger value="structures">Salary Structures</TabsTrigger>
          <TabsTrigger value="statutory">Statutory & Other Deductions</TabsTrigger>
        </TabsList>

        {/* Payroll Processing Tab */}
        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Payroll Processing</CardTitle>
              <CardDescription>Process and generate payslips for {selectedMonth} {selectedYear}. Use search to filter employees.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or ID..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                {/* {!isLocked && selectedEmployees.length > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="default"
                        onClick={() => handleProcessPayroll(selectedEmployees)}
                      >
                        <FileText className="h-4 w-4 mr-2" /> Process Selected ({selectedEmployees.length})
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Process payroll for selected employees</TooltipContent>
                  </Tooltip>
                )} */}
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedEmployees.length === filteredPayroll.length && filteredPayroll.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead> */}
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
                      {/* <TableCell>
                        <Checkbox
                          checked={selectedEmployees.includes(record.employeeId)}
                          onCheckedChange={() => toggleSelectEmployee(record.employeeId)}
                        />
                      </TableCell> */}
                      <TableCell>{record.employeeId}</TableCell>
                      <TableCell>{record.employeeName}</TableCell>
                      <TableCell>{record.payDays} / {record.lopDays}</TableCell>
                      <TableCell className="text-right font-bold">{formatCurrency(record.netPay)}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedEmployee(record)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        {record.status === 'Pending' && !isLocked && (
                          <Button variant="default" size="sm" onClick={() => handleProcessPayroll([record.employeeId])}>
                            <FileText className="h-4 w-4 mr-1" /> Process
                          </Button>
                        )}
                        {record.payslipGenerated && (
                          <Button variant="ghost" size="sm" onClick={() => console.log('Download payslip for', record.employeeId)}>
                            <Download className="h-4 w-4 mr-1" /> Payslip
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPayroll.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No employees found for this search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salary Structures Tab */}
        <TabsContent value="structures">
          <Card>
            <CardHeader>
              <CardTitle>Employee Salary Structures</CardTitle>
              <CardDescription>View and manage employee-wise salary components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or ID..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>CTC</TableHead>
                    <TableHead>Gross Salary</TableHead>
                    <TableHead>Basic</TableHead>
                    <TableHead>HRA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeSalaryStructures
  .filter(struct =>
    filteredPayroll.some(p => p.employeeId === struct.employeeId)
  )
  .map(struct => (
    <TableRow key={struct.employeeId}>
      <TableCell>{struct.employeeId}</TableCell>
      <TableCell>{struct.employeeName}</TableCell>
      <TableCell>{formatCurrency(struct.ctc)}</TableCell>
      <TableCell>{formatCurrency(struct.grossSalary)}</TableCell>
      <TableCell>{formatCurrency(struct.basicSalary)}</TableCell>
      <TableCell>{formatCurrency(struct.hra)}</TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEditStructure(struct)}
        >
          <Edit className="h-4 w-4 mr-1" /> Edit/View
        </Button>
      </TableCell>
    </TableRow>
  ))}

                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="statutory">
          <div className="space-y-6">
            {/* <Card>
              <CardHeader>
                <CardTitle>Payroll Summary Report</CardTitle>
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

            <Card>
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
                    {employeePayslipReport.map(report => (
                      <TableRow key={`${report.employeeId}-${report.month}`}>
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
            </Card>

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
                    {statutoryCompliance.map(report => (
                      <TableRow key={report.month}>
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
            </Card>*/}

              <Card>
            <CardHeader>
              <CardTitle>Employee Statutory Deductions</CardTitle>
              {/* <CardDescription>View and manage employee-wise salary components</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or ID..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>PF</TableHead>
                    <TableHead>ESIC</TableHead>
                    <TableHead>Professional Tax</TableHead>
                    <TableHead>Income Tax</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeSalaryStructures
  .filter(struct =>
    filteredPayroll.some(p => p.employeeId === struct.employeeId)
  )
  .map(struct => (
                    <TableRow key={struct.employeeId}>
                      <TableCell>{struct.employeeId}</TableCell>
                      <TableCell>{struct.employeeName}</TableCell>
                      {(() => {
                          const key = `${struct.employeeId}-${selectedMonth}-${selectedYear}`;
                          const ded = deductionsData[key];

                          return (
                            <>
                              <TableCell>{formatCurrency((ded?.pfEmployee || 0) + (ded?.pfEmployer || 0))}</TableCell>
                              <TableCell>{formatCurrency((ded?.esicEmployee || 0) + (ded?.esicEmployer || 0))}</TableCell>
                              <TableCell>{formatCurrency(ded?.professionalTax || 0)}</TableCell>
                              <TableCell>{formatCurrency(ded?.incomeTax || 0)}</TableCell>
                            </>
                          );
                        })()}
                         <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleStatutoryEditStructure(struct)}>
                          <Edit className="h-4 w-4 mr-1" /> Edit/View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                      {/* <TableCell>{formatCurrency(struct.pf)}</TableCell>
                      <TableCell>{formatCurrency(struct.esic)}</TableCell>
                      <TableCell>{formatCurrency(struct.professionalTax)}</TableCell>
                      <TableCell>{formatCurrency(struct.incomeTax)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleStatutoryEditStructure(struct)}>
                          <Edit className="h-4 w-4 mr-1" /> Edit/View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>


          </div>
        </TabsContent> 
      </Tabs>

      {/* Employee Payroll Detail Dialog */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedEmployee && (
            <>
              {/* <DialogHeader>
                <DialogTitle>Payslip Details – {selectedEmployee.employeeName} – {selectedEmployee.month} {selectedEmployee.year}</DialogTitle>
                <DialogDescription>Net Pay: {formatCurrency(selectedEmployee.netPay)}</DialogDescription>
              </DialogHeader> */}

              <DialogHeader>
                <DialogTitle>Payslip Details</DialogTitle>
                <DialogTitle>Employee ID – {selectedEmployee.employeeId}</DialogTitle>
                <DialogTitle>Employee Name – {selectedEmployee.employeeName}</DialogTitle>
                <DialogTitle>Salary Month – {selectedEmployee.month} {selectedEmployee.year}</DialogTitle>
                {/* <DialogDescription>Net Pay: {formatCurrency(selectedEmployee.netPay)}</DialogDescription> */}
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6">
                {/* Earnings */}
                <div>
                  <h3 className="font-semibold mb-2">Earnings</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Pay Days</span><span>{(selectedEmployee.payDays)}</span></div>
                    <div className="flex justify-between"><span>LOP Days</span><span>{(selectedEmployee.lopDays)}</span></div>
                    <div className="flex justify-between"><span>Gross Salary</span><span>{formatCurrency(selectedEmployee.grossSalary)}</span></div>
                    <div className="flex justify-between"><span>Total Deductions</span><span>{formatCurrency(selectedEmployee.totalDeductions)}</span></div>
                    <div className="font-semibold mb-2 flex justify-between"><span>Net Pay</span><span>{formatCurrency(selectedEmployee.netPay)}</span></div>
                    {/* {(() => {
                      const struct = employeeSalaryStructures.find(s => s.employeeId === selectedEmployee.employeeId);
                      return struct ? (
                        <>
                          <div className="flex justify-between"><span>Basic</span><span>{formatCurrency(struct.basicSalary)}</span></div>
                          <div className="flex justify-between"><span>DA/VDA</span><span>{formatCurrency(struct.daVda)}</span></div>
                          <div className="flex justify-between"><span>HRA</span><span>{formatCurrency(struct.hra)}</span></div>
                          <div className="flex justify-between"><span>Special Allowance</span><span>{formatCurrency(struct.specialAllowance)}</span></div>
                          <div className="flex justify-between"><span>Conveyance</span><span>{formatCurrency(struct.conveyanceAllowance)}</span></div>
                          <div className="flex justify-between"><span>Medical</span><span>{formatCurrency(struct.medicalAllowance)}</span></div>
                          <div className="flex justify-between"><span>Other Allowances</span><span>{formatCurrency(struct.otherAllowances)}</span></div>
                        </>
                      ) : null;
                    })()} */}
                  </div>
                </div>

                {/* Deductions */}
                {/* <div>
                  <h3 className="font-semibold mb-2">Deductions</h3>
                  <div className="space-y-2 text-sm">
                    {(() => {
                      const key = `${selectedEmployee.employeeId}-${selectedEmployee.month}-${selectedEmployee.year}`;
                      const ded = deductionsData[key as keyof typeof deductionsData];
                      return ded ? Object.entries(ded).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-red-600">{formatCurrency(v)}</span>
                        </div>
                      )) : null;
                    })()}
                  </div>
                </div> */}

                {/* Payment & Statutory */}
                <div>
                  <h3 className="font-semibold mb-2">Payment</h3>
                  <div className="space-y-2 text-sm">
                    <div><Label>Payment Mode</Label><Select disabled={selectedEmployee.payslipGenerated}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Bank" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Bank">Bank</SelectItem>
                                          <SelectItem value="Cash">Cash</SelectItem>
                                          <SelectItem value="Cheque">Cheque</SelectItem>
                                        </SelectContent>
                                      </Select></div>
                    <div><Label>Bank Account Number</Label><Input value={selectedEmployee.bankAccountNumber} readOnly /></div>
                    <div><Label>IFSC Code</Label><Input value={selectedEmployee.ifscCode} readOnly /></div>
                    <div><Label>Branch Name</Label><Input value={selectedEmployee.branchName} readOnly /></div>
                    <div><Label>Branch Address</Label><Input value={selectedEmployee.branchAddress} readOnly /></div>
                    {/* <div><Label>Aadhar</Label><Input value={selectedEmployee.aadhar} readOnly /></div>
                    <div><Label>PAN</Label><Input value={selectedEmployee.pan} readOnly /></div>
                    <div><Label>UAN</Label><Input value={selectedEmployee.uan} readOnly /></div>
                    <div><Label>PF</Label><Input value={selectedEmployee.pf} readOnly /></div>
                    <div><Label>ESI</Label><Input value={selectedEmployee.esi} readOnly /></div> */}
                  </div>
                </div>
              </div>

              {/* <Separator className="my-4" /> */}

              <div className="flex justify-end gap-2">
                {/* {!selectedEmployee.payslipGenerated && (
                  <Button variant="outline" onClick={() => generatePayslip(selectedEmployee)}>
                    <FileCheck className="h-4 w-4 mr-2" /> Generate Payslip
                  </Button>
                )} */}
                {!selectedEmployee.payslipGenerated && (
                  <Button variant="outline" onClick={null}>
                    <FileCheck className="h-4 w-4 mr-2" /> Save
                  </Button>
                )}
                {/* <Button onClick={() => console.log('Initiate payment for', selectedEmployee.employeeId)}>
                  <IndianRupee className="h-4 w-4 mr-2" /> Proceed to Payment
                </Button>
                <Button onClick={() => console.log('Download PDF for', selectedEmployee.employeeId)}>
                  <Download className="h-4 w-4 mr-2" /> Download PDF
                </Button> */}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Salary Structure Edit Dialog */}
      <Dialog open={!!selectedStructure} onOpenChange={() => { setSelectedStructure(null); setEditingStructure(null); }}>
        <DialogContent className="max-w-2xl">
          {selectedStructure && editingStructure && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Salary Structure – {selectedStructure.employeeName}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>CTC</Label>
                    <Input type="number" value={editingStructure.ctc} onChange={e => handleStructureChange('ctc', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Gross Salary</Label>
                    <Input type="number" value={editingStructure.grossSalary} onChange={e => handleStructureChange('grossSalary', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Basic Salary</Label>
                    <Input type="number" value={editingStructure.basicSalary} onChange={e => handleStructureChange('basicSalary', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>DA/VDA</Label>
                    <Input type="number" value={editingStructure.daVda} onChange={e => handleStructureChange('daVda', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>HRA</Label>
                    <Input type="number" value={editingStructure.hra} onChange={e => handleStructureChange('hra', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Special Allowance</Label>
                    <Input type="number" value={editingStructure.specialAllowance} onChange={e => handleStructureChange('specialAllowance', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Conveyance Allowance</Label>
                    <Input type="number" value={editingStructure.conveyanceAllowance} onChange={e => handleStructureChange('conveyanceAllowance', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Medical Allowance</Label>
                    <Input type="number" value={editingStructure.medicalAllowance} onChange={e => handleStructureChange('medicalAllowance', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Other Allowances</Label>
                    <Input type="number" value={editingStructure.otherAllowances} onChange={e => handleStructureChange('otherAllowances', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Group Health Insurance</Label>
                    <Input type="number" value={editingStructure.groupHealthInsurance} onChange={e => handleStructureChange('groupHealthInsurance', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Group Accidental Insurance</Label>
                    <Input type="number" value={editingStructure.groupAccidentalInsurance} onChange={e => handleStructureChange('groupAccidentalInsurance', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Short Paid Last Month</Label>
                    <Input type="number" value={editingStructure.shortPaidLastMonth} onChange={e => handleStructureChange('shortPaidLastMonth', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Excess Paid Last Month</Label>
                    <Input type="number" value={editingStructure.excessPaidLastMonth} onChange={e => handleStructureChange('excessPaidLastMonth', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Arrears</Label>
                    <Input type="number" value={editingStructure.arrears} onChange={e => handleStructureChange('arrears', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Salary Advance</Label>
                    <Input type="number" value={editingStructure.salaryAdvance} onChange={e => handleStructureChange('salaryAdvance', Number(e.target.value))} />
                  </div>
                  {/* Switches for eligibilities */}
                  <div className="flex items-center space-x-2">
                    <Switch checked={editingStructure.travelReimbursementEligibility} onCheckedChange={v => handleStructureChange('travelReimbursementEligibility', v)} />
                    <Label>Travel Reimbursement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={editingStructure.bonusEligibility} onCheckedChange={v => handleStructureChange('bonusEligibility', v)} />
                    <Label>Bonus</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={editingStructure.incentiveEligibility} onCheckedChange={v => handleStructureChange('incentiveEligibility', v)} />
                    <Label>Incentive</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={editingStructure.gratuityEligibility} onCheckedChange={v => handleStructureChange('gratuityEligibility', v)} />
                    <Label>Gratuity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={editingStructure.pfEligibility} onCheckedChange={v => handleStructureChange('pfEligibility', v)} />
                    <Label>PF</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={editingStructure.professionalTax} onCheckedChange={v => handleStructureChange('professionalTax', v)} />
                    <Label>Professional Tax</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={editingStructure.incomeTax} onCheckedChange={v => handleStructureChange('incomeTax', v)} />
                    <Label>Income Tax</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={editingStructure.tds} onCheckedChange={v => handleStructureChange('tds', v)} />
                    <Label>TDS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={editingStructure.esiEligibility} onCheckedChange={v => handleStructureChange('esiEligibility', v)} />
                    <Label>ESI</Label>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button onClick={handleSaveStructure}>
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>


      <Dialog
  open={!!selectedStatutoryEmployee}
  onOpenChange={() => {
    setSelectedStatutoryEmployee(null);
    setEditingStatutory(null);
  }}
>
  <DialogContent className="max-w-lg">
    {editingStatutory && (
      <>
        <DialogHeader>
          <DialogTitle>
            Statutory Deductions – {selectedStatutoryEmployee?.employeeName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>PF Employee</Label>
            <Input
              type="number"
              value={editingStatutory.pfEmployee}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, pfEmployee: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>PF Employer</Label>
            <Input
              type="number"
              value={editingStatutory.pfEmployer}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, pfEmployer: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>ESIC Employee</Label>
            <Input
              type="number"
              value={editingStatutory.esicEmployee}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, esicEmployee: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>ESIC Employer</Label>
            <Input
              type="number"
              value={editingStatutory.esicEmployer}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, esicEmployer: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>Professional Tax</Label>
            <Input
              type="number"
              value={editingStatutory.professionalTax}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, professionalTax: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>Income Tax</Label>
            <Input
              type="number"
              value={editingStatutory.incomeTax}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, incomeTax: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>TDS</Label>
            <Input
              type="number"
              value={editingStatutory.tds}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, tds: Number(e.target.value) })
              }
            />
          </div>

           <div>
            <Label>Labour Welfare Fund</Label>
            <Input
              type="number"
              value={editingStatutory.labourWelfareFund}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, labourWelfareFund: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>Salary Advance</Label>
            <Input
              type="number"
              value={editingStatutory.salaryAdvance}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, salaryAdvance: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>Tour Advance</Label>
            <Input
              type="number"
              value={editingStatutory.tourAdvance}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, tourAdvance: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>Medical Advance</Label>
            <Input
              type="number"
              value={editingStatutory.medicalAdvance}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, medicalAdvance: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>Festival Advance</Label>
            <Input
              type="number"
              value={editingStatutory.festivalAdvance}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, festivalAdvance: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>Excess Paid Last Month</Label>
            <Input
              type="number"
              value={editingStatutory.excessPaidLastMonth}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, excessPaidLastMonth: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>Employee Contribution - Group Health Insurance</Label>
            <Input
              type="number"
              value={editingStatutory.employeeContributionGroupHealthInsurance}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, employeeContributionGroupHealthInsurance: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <Label>Employee Contribution - Group Accidental Insurance</Label>
            <Input
              type="number"
              value={editingStatutory.employeeContributionGroupAccidentalInsurance}
              onChange={e =>
                setEditingStatutory({ ...editingStatutory, employeeContributionGroupAccidentalInsurance: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSaveStatutory}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
        </DialogFooter>
      </>
    )}
  </DialogContent>
</Dialog>



    </div>
  );
};

export default HRPayroll;