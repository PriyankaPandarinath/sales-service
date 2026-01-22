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

interface Department {
  id: string;
  name: string;
  code: string;
  branch: string;
  hod: string;
  status: "Active" | "Inactive";
}

const branches = ["Hyderabad", "Bangalore", "Vizag"];

const initialDepartments: Department[] = [
  {
    id: "1",
    name: "Service",
    code: "SERV",
    branch: "Hyderabad",
    hod: "Not Assigned",
    status: "Active",
  },
];

const DepartmentMaster = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);

  const handleSave = () => {
    if (editing) {
      setDepartments((prev) =>
        prev.map((d) => (d.id === editing.id ? editing : d))
      );
    } else {
      setDepartments((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: "",
          code: "",
          branch: "",
          hod: "Not Assigned",
          status: "Active",
        },
      ]);
    }
    setOpen(false);
    setEditing(null);
  };

  const toggleStatus = (id: string) => {
    setDepartments((prev) =>
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
          <CardTitle>Department Master</CardTitle>
          <CardDescription>Manage departments under branches</CardDescription>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-accent">
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Department Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>HOD</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell>{d.code}</TableCell>
                  <TableCell>{d.branch}</TableCell>
                  <TableCell>{d.hod}</TableCell>
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
              {editing ? "Edit Department" : "Add Department"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Department Name</Label>
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
                <Label>Department Code</Label>
                <Input />
              </div>
              <div>
                <Label>Branch</Label>
                <Select defaultValue={editing?.branch || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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

export default DepartmentMaster;
