import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function Hero() {
  return (
    <MaxWidthWrapper>
      <div className="py-12 md:py-20 mx-auto text-center flex flex-col items-center max-w-3xl font-sans">
        <h1 className="text-4xl font-bold tracking-tight text-[#16334e] sm:text-[4rem]">
          Get new customers and only{" "}
          <span className="text-blue-600">pay per call</span>.
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to Lead Call Pro. Pay when a customer calls. No monthly or
          sign up fee required. Get started today and improve your business
          calls.
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
  );
}
