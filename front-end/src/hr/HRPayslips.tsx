import React, { useState } from 'react';
import {
  Download,
  Eye,
  IndianRupee,
  FileText,
  Mail,
  Printer,
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

/* ---------------- MOCK PAYSLIPS (HR VIEW) ---------------- */
const payslips = [
  {
    id: '1',
    employeeId: 'SSSPL001',
    employeeName: 'Rajesh Kumar Singh',
    month: 'January 2026',
    department: 'Engineering',
    designation: 'Senior Engineer',
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
    status: 'Generated',
  },
  {
    id: '2',
    employeeId: 'SSSPL002',
    employeeName: 'Priya Sharma',
    month: 'January 2026',
    department: 'Sales',
    designation: 'Sales Manager',
    earnings: {
      basic: 42000,
      hra: 20000,
      special: 12000,
      conveyance: 4000,
      medical: 3000,
    },
    deductions: {
      pf: 5040,
      esi: 1200,
      professionalTax: 200,
      incomeTax: 3500,
      tds: 1500,
    },
    netPay: 69060,
    status: 'Generated',
  },
];

/* ---------------- COMPONENT ---------------- */
const HRPayslips: React.FC = () => {
  const [selectedPayslip, setSelectedPayslip] =
    useState<typeof payslips[0] | null>(null);

  const format = (n: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Payslip Generation – HR</h1>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Payslips</CardTitle>
          <CardDescription>
            Auto-generated payslips after payroll processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payslips.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="font-medium">{p.employeeName}</div>
                    <div className="text-xs text-muted-foreground">
                      {p.employeeId}
                    </div>
                  </TableCell>
                  <TableCell>{p.month}</TableCell>
                  <TableCell>{p.department}</TableCell>
                  <TableCell className="font-semibold">
                    {format(p.netPay)}
                  </TableCell>
                  <TableCell>
                    <Badge className="badge-success">{p.status}</Badge>
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

      {/* PAYSLIP VIEW */}
      <Dialog
        open={!!selectedPayslip}
        onOpenChange={() => setSelectedPayslip(null)}
      >
        <DialogContent className="max-w-3xl">
          {selectedPayslip && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Payslip – {selectedPayslip.month}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6 mt-4">
                {/* EARNINGS */}
                <div>
                  <h3 className="font-semibold mb-2">Earnings</h3>
                  {Object.entries(selectedPayslip.earnings).map(
                    ([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between text-sm"
                      >
                        <span className="capitalize">{k}</span>
                        <span>{format(v)}</span>
                      </div>
                    )
                  )}
                </div>

                {/* DEDUCTIONS */}
                <div>
                  <h3 className="font-semibold mb-2">Deductions</h3>
                  {Object.entries(selectedPayslip.deductions).map(
                    ([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between text-sm"
                      >
                        <span className="capitalize">{k}</span>
                        <span className="text-destructive">
                          {format(v)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Net Pay</span>
                <span className="text-success">
                  {format(selectedPayslip.netPay)}
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

export default HRPayslips;
