import React, { useState } from "react";
import { Building2, IndianRupee } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

/* 🌍 SAMPLE ORGANIZATION-LEVEL PAYROLL DATA */
const organizationPayrollData = [
  {
    organizationId: "ORG001",
    organizationName: "Vijayawada",
    month: "January",
    year: "2026",
    branchesCount: 5,
    employeesCount: 120,
    totalGross: 9800000,
    totalDeductions: 1620000,
    totalNetPay: 8180000,
    payrollStatus: "Completed",
  },
  {
    organizationId: "ORG002",
    organizationName: "Hyderabad",
    month: "January",
    year: "2026",
    branchesCount: 3,
    employeesCount: 58,
    totalGross: 4200000,
    totalDeductions: 690000,
    totalNetPay: 3510000,
    payrollStatus: "Completed",
  },
  {
    organizationId: "ORG003",
    organizationName: "Vishakapatnam",
    month: "January",
    year: "2026",
    branchesCount: 2,
    employeesCount: 34,
    totalGross: 5600000,
    totalDeductions: 1100000,
    totalNetPay: 4500000,
    payrollStatus: "Pending",
  },
];

/* 💰 Currency Formatter */
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const SuperAdminPayroll: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState("2026");

  const filteredData = organizationPayrollData.filter(
    o => o.month === selectedMonth && o.year === selectedYear
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Organization Payroll Overview</h1>
          <p className="text-muted-foreground">
            Consolidated payroll summary per organization
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December",
              ].map(m => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["2024","2025","2026","2027"].map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Organization Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Payroll Summary — {selectedMonth} {selectedYear}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                {/* <TableHead className="text-center">Branches</TableHead> */}
                <TableHead className="text-center">Employees</TableHead>
                <TableHead className="text-right">Gross</TableHead>
                <TableHead className="text-right">Deductions</TableHead>
                <TableHead className="text-right">Net Pay</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredData.map(org => (
                <TableRow key={org.organizationId}>
                  <TableCell>
                    <p className="font-medium">{org.organizationName}</p>
                    <p className="text-xs text-muted-foreground">
                      {org.organizationId}
                    </p>
                  </TableCell>
                  {/* <TableCell className="text-center">
                    {org.branchesCount}
                  </TableCell> */}
                  <TableCell className="text-center">
                    {org.employeesCount}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(org.totalGross)}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    -{formatCurrency(org.totalDeductions)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-green-600">
                    {formatCurrency(org.totalNetPay)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(org.payrollStatus)}
                  </TableCell>
                </TableRow>
              ))}

              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No payroll data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminPayroll;
