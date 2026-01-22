import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Power,
  Mail,
  Phone,
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

type Role = "admin" | "hr" | "manager" | "employee";
type Status = "active" | "inactive";

interface Person {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  branch: string;
  department?: string;
  designation?: string;
  status: Status;
}

/* ---------------- MOCK DATA ---------------- */

const branches = ["Hyderabad", "Bangalore", "Chennai", "Mumbai"];
const departments = ["Engineering", "Sales", "HR", "Operations", "Finance"];

const mockPeople: Person[] = [
  // ADMINS
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
    id: "A002",
    fullName: "Bangalore Admin",
    email: "admin.blr@company.com",
    phone: "+91 98888 22222",
    role: "admin",
    branch: "Bangalore",
    status: "active",
  },

  // HR
  {
    id: "H001",
    fullName: "Priya Sharma",
    email: "hr.hyd@company.com",
    phone: "+91 97777 33333",
    role: "hr",
    branch: "Hyderabad",
    department: "HR",
    status: "active",
  },

  // MANAGERS
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

  // EMPLOYEES
  {
    id: "E001",
    fullName: "Sneha Reddy",
    email: "sneha@company.com",
    phone: "+91 95555 55555",
    role: "employee",
    branch: "Hyderabad",
    department: "Engineering",
    designation: "Software Engineer",
    status: "active",
  },
  {
    id: "E002",
    fullName: "Amit Patel",
    email: "amit@company.com",
    phone: "+91 94444 66666",
    role: "employee",
    branch: "Hyderabad",
    department: "Sales",
    designation: "Sales Executive",
    status: "active",
  },
];

/* ---------------- COMPONENT ---------------- */

const UserManagement: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const isSuperAdmin = user?.role === "SUPERADMIN";
  const isAdmin = user?.role === "ADMIN";

  const [activeTab, setActiveTab] = useState<Role>("admin");
  const [search, setSearch] = useState("");
  const [people, setPeople] = useState<Person[]>(mockPeople);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /* ---------------- TAB VISIBILITY ---------------- */

  const allowedTabs: Role[] = isSuperAdmin
    ? ["admin", "hr", "manager", "employee"]
    : ["hr", "manager", "employee"];

  /* ---------------- FILTER DATA ---------------- */

  const filteredPeople = people.filter((p) => {
    if (!allowedTabs.includes(p.role)) return false;
    if (isAdmin && p.branch !== user?.branch) return false;
    if (isAdmin && p.role === "admin") return false;

    return (
      p.role === activeTab &&
      (p.fullName.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()))
    );
  });

  /* ---------------- PERMISSIONS ---------------- */

  const canAdd =
    (isSuperAdmin && activeTab === "admin") ||
    (isAdmin && (activeTab === "hr" || activeTab === "manager"));

  const canEditEmployee =
    activeTab === "employee" && isAdmin; // limited edit

  /* ---------------- ACTIONS ---------------- */

  const toggleStatus = (id: string) => {
    setPeople((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      )
    );
    toast({
      title: "Status updated",
      description: "Status changed successfully.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Saved",
      description: "Details saved successfully.",
    });
    setIsDialogOpen(false);
    setSelectedPerson(null);
  };


  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">People Management</h1>
          <p className="text-muted-foreground">
            Manage admins, HR, managers, and employees
          </p>
        </div>

        {canAdd && (
          <Button
            className="bg-accent"
            onClick={() => {
              setSelectedPerson(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Role)}>
        <TabsList>
          {allowedTabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab.toUpperCase()}S
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
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPeople.map((p) => (
          <Card key={p.id} className="card-hover">
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{p.fullName}</p>
                  <p className="text-sm text-muted-foreground">{p.email}</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedPerson(p)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View / Edit
                    </DropdownMenuItem>

                    {p.role !== "employee" && (
                      <DropdownMenuItem
                        onClick={() => toggleStatus(p.id)}
                        className={
                          p.status === "active"
                            ? "text-destructive"
                            : "text-success"
                        }
                      >
                        <Power className="h-4 w-4 mr-2" />
                        {p.status === "active" ? "Disable" : "Enable"}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  {p.role.toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {p.branch}
                </div>
                {p.department && <div>{p.department}</div>}
                {p.designation && <div>{p.designation}</div>}
                <Badge
                  className={
                    p.status === "active"
                      ? "badge-success"
                      : "badge-destructive"
                  }
                >
                  {p.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog
        open={isDialogOpen || !!selectedPerson}
        onOpenChange={() => {
          setIsDialogOpen(false);
          setSelectedPerson(null);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedPerson ? "Edit" : "Add"}{" "}
              {activeTab.toUpperCase()}
            </DialogTitle>
            <DialogDescription>
              Enter details below
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Full Name *</Label>
              <Input defaultValue={selectedPerson?.fullName} />
            </div>
            <div>
              <Label>Email *</Label>
              <Input defaultValue={selectedPerson?.email} />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input defaultValue={selectedPerson?.phone} />
            </div>

            {activeTab !== "admin" && (
              <div>
                <Label>Department</Label>
                <Select defaultValue={selectedPerson?.department}>
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

            <div>
              <Label>Branch *</Label>
              <Select
                defaultValue={
                  isAdmin ? user?.branch : selectedPerson?.branch
                }
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
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline"
            onClick={() => {
              setIsDialogOpen(false);
              setSelectedPerson(null);
            }}
            >Cancel</Button>
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
