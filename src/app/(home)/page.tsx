import Link from "next/link";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Your marketplace for high-quality{" "}
          <span className="text-blue-600">digital assets</span>.
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to DigitalHippo. Every asset on our platform is verified by
          our team to ensure our highest quality standards.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/sign-up" className={`${buttonVariants()}, px-8`}>
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
