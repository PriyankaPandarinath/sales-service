import { useState } from "react";
import { Plus, Edit, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Designation {
  id: string;
  name: string;
  level: string;
  department: string;
  reportingTo: string;
  status: "Active" | "Inactive";
}

const departments = ["Service", "Sales", "Accounts"];
const levels = ["L1", "L2", "L3", "M1", "M2"];

const initialDesignations: Designation[] = [
  {
    id: "1",
    name: "Senior Technician",
    level: "L2",
    department: "Service",
    reportingTo: "Service Manager",
    status: "Active",
  },
  {
    id: "2",
    name: "Service Manager",
    level: "M1",
    department: "Service",
    reportingTo: "Operations Head",
    status: "Active",
  },
];

const DesignationMaster = () => {
  const [designations, setDesignations] =
    useState<Designation[]>(initialDesignations);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Designation | null>(null);

  const handleSave = () => {
    if (editing) {
      setDesignations((prev) =>
        prev.map((d) => (d.id === editing.id ? editing : d))
      );
    } else {
      setDesignations((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: "",
          level: "",
          department: "",
          reportingTo: "",
          status: "Active",
        },
      ]);
    }
    setOpen(false);
    setEditing(null);
  };

  const toggleStatus = (id: string) => {
    setDesignations((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" }
          : d
      )
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Designation Master</CardTitle>
          <CardDescription>
            Define roles, hierarchy and reporting structure
          </CardDescription>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-accent">
          <Plus className="h-4 w-4 mr-2" />
          Add Designation
        </Button>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Designation</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Reports To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {designations.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>{d.level}</TableCell>
                  <TableCell>{d.department}</TableCell>
                  <TableCell>{d.reportingTo}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        d.status === "Active"
                          ? "badge-success"
                          : "badge-destructive"
                      }
                    >
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(d);
                        setOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus(d.id)}
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Designation" : "Add Designation"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Designation Name</Label>
              <Input
                value={editing?.name || ""}
                onChange={(e) =>
                  setEditing((prev) =>
                    prev ? { ...prev, name: e.target.value } : prev
                  )
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Level / Grade</Label>
                <Select defaultValue={editing?.level || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Department</Label>
                <Select defaultValue={editing?.department || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Reporting To</Label>
              <Input placeholder="Parent designation" />
            </div>

            <div>
              <Label>Status</Label>
              <Select defaultValue="Active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-accent">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DesignationMaster;
