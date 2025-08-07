import ButtonSubmit from "@/components/common/button-submit";
import SectionSocials from "../../../components/profile/section-socials";
import SectionPersonal from "../../../components/profile/section-personal";
import SectionPhoto from "../../../components/profile/section-photo";
import SectionPublicProfile from "../../../components/profile/section-public-profile";
import { UserProvider } from "@/contexts/user-context";
import ProfileInfo from "@/components/profile/profile-info";
import { getCurrentUser, updateProfile } from "@/server/user.actions";

export const metadata = {
  title: "My Profile",
};

export default async function Page() {
  const user = await getCurrentUser();

  // Exclude the 'stripe_verified' field from profile data
  const profileFields = Object.entries(user).filter(
    ([key, _]) => key !== "stripe_verified" && key !== "stripe_customer_id"
  );

  const incompleteProfileFields =
    profileFields.filter(([_, value]) => !value).length > 0;

  return (
    <UserProvider user={user}>
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-[24px] font-semibold mb-4">My Profile</h2>

        <SectionPhoto />
        {incompleteProfileFields && <ProfileInfo />}
        <SectionPublicProfile />

        <form action={updateProfile}>
          <div className="grid gap-8 mb-6">
            <SectionPersonal />
            <SectionSocials />
          </div>

          <div className="col-span-2 flex justify-end">
            <ButtonSubmit
              text="Save changes"
              pendingText="Saving"
              toastPendingMessage="Updating your Profile"
              toastSuccessMessage="Profile successfully updated!"
            />
          </div>
        </form>
      </div>
    </UserProvider>
  );
}
