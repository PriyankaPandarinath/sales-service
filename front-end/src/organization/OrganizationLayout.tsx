import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyMaster from "./CompanyMaster";
import BranchMaster from "./BranchMaster";
import DepartmentMaster from "./DepartmentMaster";
import DesignationMaster from "./DesignationMaster";

const OrganizationLayout = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Organization Master</h1>
        <p className="text-muted-foreground">
          Configure company structure and hierarchy
        </p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="branch">Branch</TabsTrigger>
          <TabsTrigger value="department">Department</TabsTrigger>
          <TabsTrigger value="designation">Designation</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <CompanyMaster />
        </TabsContent>
        <TabsContent value="branch">
          <BranchMaster />
        </TabsContent>
        <TabsContent value="department">
          <DepartmentMaster />
        </TabsContent>
        <TabsContent value="designation">
          <DesignationMaster />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationLayout;
