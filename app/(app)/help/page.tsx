import FAQS from "./faq";

export const metadata = {
  title: "Help",
};

export default function Page() {
  return (
    <div className="p-6 bg-gray-50">
      <FAQS />
    </div>
  );
}
