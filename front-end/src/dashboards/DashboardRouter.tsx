import { useAuth } from "@/contexts/AuthContext";
import EmployeeDashboard from "./EmployeeDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import AdminDashboard from "./AdminDashboard";
import HRDashboard from "./HRDashboard";
import ManagerDashboard from "./ManagerDashboard";

const DashboardRouter = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case "SUPERADMIN":
      return <SuperAdminDashboard />;
    case "ADMIN":
      return <AdminDashboard />;
    case "hr":
      return <HRDashboard />;
    case "manager":
      return <ManagerDashboard />;
    default:
      return <EmployeeDashboard />;
  }
};

export default DashboardRouter;

