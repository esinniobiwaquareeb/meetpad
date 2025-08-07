import { ServicesProvider } from "./services-context";
import ServiceCards from "./service-cards";
import NoServices from "./no-services";
import { getServices } from "@/server/service.actions";
import { getCurrentUser } from "@/server/user.actions";

export const revalidate = 0;

export default async function ServiceList() {
  let services;
  const user = await getCurrentUser();

  try {
    services = await getServices(user.id);
  } catch (error) {
    console.error("Failed to fetch user services:");
    return (
      <div className="error">
        <p>
          There was an error fetching your services. Please try again later.
        </p>
      </div>
    );
  }

  if (!services || !services.length) return <NoServices />;

  return (
    <ServicesProvider services={services}>
      <ServiceCards />
    </ServicesProvider>
  );
}
