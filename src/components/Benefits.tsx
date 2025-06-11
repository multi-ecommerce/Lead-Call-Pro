import { PhoneIncoming, MonitorSmartphone, Leaf } from "lucide-react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const perks = [
  {
    name: "Instant Call",
    Icon: PhoneIncoming,
    description:
      "Our campaigns deliver phone leads and form submission leads for services that you offer, from people in your target area.",
  },
  {
    name: "Done-For-You Lead Generation",
    Icon: MonitorSmartphone,
    description:
      "We pay the ad spend and cover all the costs of building your campaign. We take on all the risk, all you have to do is answer the phone.",
  },
  {
    name: "Don’t Pay for Clicks. Pay for Customer Calls",
    Icon: Leaf,
    description:
      "We offer a proven pay-per-call service where you only pay for customer calls. With $0 setup fee, and $0 monthly service fee and $0 cancelation fee.",
  },
];

export default function Benefits() {
  return (
    <section className="border-t border-gray-200 bg-gray-50">
      <MaxWidthWrapper className="py-14">
        <div className="flex flex-1 items-center justify-center mb-8">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[#00aeef] text-xl font-bold ">Process</p>
            <h2 className="text-[#005baa] text-4xl font-bold">How It Works</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <div
              key={perk.name}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
            >
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  {<perk.Icon className="w-1/3 h-1/3" />}
                </div>
              </div>

              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-gray-900">
                  {perk.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
