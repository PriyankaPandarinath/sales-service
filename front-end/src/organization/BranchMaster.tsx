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

interface Branch {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
  gst: string;
  status: "Active" | "Inactive";
}

const initialBranches: Branch[] = [
  {
    id: "1",
    name: "Hyderabad",
    code: "HYD",
    city: "Hyderabad",
    state: "Telangana",
    gst: "36ABCDE1234F1Z5",
    status: "Active",
  },
];

const BranchMaster = () => {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);

  const handleSave = () => {
    if (editing) {
      setBranches((prev) =>
        prev.map((b) => (b.id === editing.id ? editing : b))
      );
    } else {
      setBranches((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: "",
          code: "",
          city: "",
          state: "",
          gst: "",
          status: "Active",
        },
      ]);
    }
    setOpen(false);
    setEditing(null);
  };

  const toggleStatus = (id: string) => {
    setBranches((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "Active" ? "Inactive" : "Active" }
          : b
      )
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Branch Master</CardTitle>
          <CardDescription>Manage company branches</CardDescription>
        </div>
        <Button onClick={() => setOpen(true)} className="bg-accent">
          <Plus className="h-4 w-4 mr-2" />
          Add Branch
        </Button>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Branch Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead>GST</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell>{b.code}</TableCell>
                  <TableCell>{b.city}</TableCell>
                  <TableCell>{b.state}</TableCell>
                  <TableCell>{b.gst}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        b.status === "Active"
                          ? "badge-success"
                          : "badge-destructive"
                      }
                    >
                      {b.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(b);
                        setOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus(b.id)}
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
              {editing ? "Edit Branch" : "Add Branch"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Branch Name</Label>
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
                <Label>Branch Code</Label>
                <Input />
              </div>
              <div>
                <Label>GST Number</Label>
                <Input />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input />
              </div>
              <div>
                <Label>State</Label>
                <Input />
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

export default BranchMaster;
