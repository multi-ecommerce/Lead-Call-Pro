import Link from "next/link";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { PhoneIncoming, MonitorSmartphone, Leaf } from "lucide-react";

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
      "We pay the ad spend and cover all the costs of building your campaign. We take on all the risk: all you have to do is answer the phone.",
  },
  {
    name: "Only Pay For Valid Leads",
    Icon: Leaf,
    description:
      "You won't be charged for wrong numbers, existing customers, or calls for services you don't offer. We review your calls each day so you don't pay for them.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-12 md:py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-[4rem]">
            Get new customers and only{" "}
            <span className="text-blue-600">pay per call</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Lead Call Pro. Pay when a customer calls. No monthly or
            sign up fee required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/sign-up"
              className={`${buttonVariants({
                variant: "outline",
                size: "lg",
              })}, px-8  bg-green-500 text-white hover:bg-green-400 hover:text-white`}
            >
              Try for Free
            </Link>
            <Button variant="ghost" size="lg">
              Our quality promise &rarr;
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-14">
          <div className="flex flex-1 items-center justify-center mb-8">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#00aeef] text-xl font-bold ">Process</p>
              <h2 className="text-[#005baa] text-4xl font-bold">
                How It Works
              </h2>
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
    </>
  );
}
