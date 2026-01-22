import {
  Building2,
  MapPin,
  Layers,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Companies",
    value: 1,
    icon: Building2,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Branches",
    value: 3,
    icon: MapPin,
    color: "bg-info/10 text-info",
  },
  {
    title: "Departments",
    value: 5,
    icon: Layers,
    color: "bg-success/10 text-success",
  },
  {
    title: "Designations",
    value: 12,
    icon: Briefcase,
    color: "bg-warning/10 text-warning",
  },
];

const setupStatus = [
  { label: "Company Configured", done: true },
  { label: "Branches Added", done: true },
  { label: "Departments Mapped", done: true },
  { label: "Designations Defined", done: false },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">
          System overview and organization setup status
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="card-hover">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.title}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Setup Status */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Setup Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {setupStatus.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                {s.done ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-warning" />
                )}
                <span className="font-medium">{s.label}</span>
              </div>
              <Badge
                className={
                  s.done ? "badge-success" : "badge-warning"
                }
              >
                {s.done ? "Completed" : "Pending"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Organization Master</p>
                <p className="text-sm text-muted-foreground">
                  Configure company structure
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/organization")}
            >
              Open
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover opacity-70">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-muted">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">User Management</p>
                <p className="text-sm text-muted-foreground">
                  Create Admin & HR users
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/users")}
            >
              Open
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
