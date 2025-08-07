import { Service } from "./service";
import NoService from "../services/no-services";
import { getServices } from "@/server/service.actions";
import { getCurrentUser } from "@/server/user.actions";
import { ServicesProvider } from "../services/services-context";

export async function Services() {
  const user = await getCurrentUser();
  const services = await getServices(user.id);

  if (!services || !services.length) return <NoService showAddButton={true} />;

  return (
    <div className="grid grid-cols-1 gap-6">
      <ServicesProvider services={services}>
        {services.map((service) => {
          return <Service key={service.id} service={service} />;
        })}
      </ServicesProvider>
    </div>
  );
}
