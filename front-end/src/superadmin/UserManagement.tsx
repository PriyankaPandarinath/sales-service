import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Power,
  Building2,
  UserCog,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

/* ---------------- TYPES ---------------- */

type Role = "admin" | "hr" | "manager";
type Status = "active" | "inactive";

interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  branch: string;
  department?: string;
  status: Status;
}

/* ---------------- MOCK DATA ---------------- */

const branches = ["Hyderabad", "Bangalore", "Chennai", "Mumbai"];
const departments = ["Engineering", "Sales", "HR", "Operations", "Finance"];

const mockUsers: UserRecord[] = [
  {
    id: "A001",
    fullName: "Hyderabad Admin",
    email: "admin.hyd@company.com",
    phone: "+91 90000 11111",
    role: "admin",
    branch: "Hyderabad",
    status: "active",
  },
  {
    id: "H001",
    fullName: "Priya Sharma",
    email: "hr.hyd@company.com",
    phone: "+91 97777 33333",
    role: "hr",
    branch: "Hyderabad",
    status: "active",
  },
  {
    id: "M001",
    fullName: "Ravi Kumar",
    email: "manager.hyd@company.com",
    phone: "+91 96666 44444",
    role: "manager",
    branch: "Hyderabad",
    department: "Engineering",
    status: "inactive",
  },
];

/* ---------------- COMPONENT ---------------- */

const UserManagement: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // normalize backend role (SUPERADMIN / ADMIN / HR)
  const currentRole = user?.role?.toLowerCase();

  const isSuperAdmin = currentRole === "superadmin";
  const isAdmin = currentRole === "admin";

  // HR & Manager should never see this page
  if (!isSuperAdmin && !isAdmin) return null;

  const [activeTab, setActiveTab] = useState<Role>("admin");
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<UserRecord[]>(mockUsers);
  const [editing, setEditing] = useState<UserRecord | null>(null);
  const [open, setOpen] = useState(false);

  /* ---------------- TAB VISIBILITY ---------------- */

  const allowedTabs: Role[] = isSuperAdmin
    ? ["admin", "hr", "manager"]
    : ["manager"];

  /* ---------------- FILTERING ---------------- */

  const filtered = records.filter((r) => {
    if (!allowedTabs.includes(r.role)) return false;
    if (isAdmin && r.branch !== user?.branch) return false;
    if (isAdmin && r.role === "admin") return false;

    return (
      r.role === activeTab &&
      (r.fullName.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()))
    );
  });

  /* ---------------- PERMISSIONS ---------------- */

  const canAdd =
    (isSuperAdmin && (activeTab === "admin" || activeTab === "hr")) ||
    (isAdmin && (activeTab === "manager"));

  /* ---------------- ACTIONS ---------------- */

  const toggleStatus = (id: string) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "active" ? "inactive" : "active" }
          : r
      )
    );
    toast({ title: "Status updated" });
  };

  useEffect(() => {
    // If the active tab is no longer allowed, switch to the first allowed tab
    if (!allowedTabs.includes(activeTab)) {
      setActiveTab(allowedTabs[0]);
    }
  }, [activeTab, allowedTabs]);

  const handleSave = () => {
    toast({ title: "User saved successfully" });
    setOpen(false);
    setEditing(null);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Create and manage Admin, HR Head and Managers
          </p>
        </div>

        {canAdd && (
          <Button
            className="bg-accent"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add {activeTab.toUpperCase()}
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Role)}>
        <TabsList>
          {allowedTabs.map((t) => (
            <TabsTrigger key={t} value={t}>
              {t.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => (
          <Card key={r.id} className="card-hover">
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{r.fullName}</p>
                  <p className="text-sm text-muted-foreground">{r.email}</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditing(r)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View / Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => toggleStatus(r.id)}
                      className={
                        r.status === "active"
                          ? "text-destructive"
                          : "text-success"
                      }
                    >
                      <Power className="h-4 w-4 mr-2" />
                      {r.status === "active" ? "Disable" : "Enable"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  {r.role.toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {r.branch}
                </div>
                {r.department && <div>{r.department}</div>}
                <Badge
                  className={
                    r.status === "active"
                      ? "badge-success"
                      : "badge-destructive"
                  }
                >
                  {r.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog
        open={open || !!editing}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setEditing(null);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit" : "Add"} {activeTab.toUpperCase()}
            </DialogTitle>
            <DialogDescription>User details</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Full Name</Label>
              <Input defaultValue={editing?.fullName} />
            </div>
            <div>
              <Label>Email</Label>
              <Input defaultValue={editing?.email} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input defaultValue={editing?.phone} />
            </div>
            <div>
              <Label>Password</Label>
              <Input disabled={true} defaultValue={"id.branch.phonenumber"} />
            </div>

            {activeTab === "manager" && (
              <div>
                <Label>Department</Label>
                <Select defaultValue={editing?.department}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
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
            )}

            {(activeTab === "manager" || activeTab === "admin" ) && 
            (
            <div>
              <Label>Branch</Label>
              <Select
                defaultValue={isAdmin ? user?.branch : editing?.branch}
                disabled={isAdmin}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>          )}

          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
            <Button className="bg-accent" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
