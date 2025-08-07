import { Heading } from "@/components/ui/Heading";
import { P } from "@/components/ui/typography";
import { UserProvider } from "@/contexts/user-context";
import { getCurrentUser } from "@/server/user.actions";
import PlanSection from "./plan-section";

export default async function Page() {
  const user = await getCurrentUser();
  return (
    <UserProvider user={user}>
      <div className="p-6 bg-gray-50 rounded">
        <h2 className="text-[24px] font-semibold mb-4">My Plans</h2>
        <P size="sm">Manage your plan and billing history here</P>
        <PlanSection />
      </div>
    </UserProvider>
  );
}
