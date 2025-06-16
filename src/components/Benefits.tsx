import Image from "next/image";
import Link from "next/link";

import { CircleCheckBig } from "lucide-react";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Image1 from "../../public/shopopen.jpg";

export default function Benefits() {
  return (
    <MaxWidthWrapper className="md:px-14 py-12 lg:py-20">
      <div className="flex flex-wrap flex-col items-center justify-center px-6 py-4 gap-6 lg:flex-row lg:gap-16 lg:flex-nowrap w-full text-[#212529]">
        <div className="shrink-0">
          <Image src={Image1} alt="Shop Image" width={400} />
        </div>
        <div className="max-w-xl w-full">
          <div>
            <p className="text-[#16334e] text-3xl font-extrabold mb-10">
              Visibility is crucial{" "}
              <span className="block"> to your business&apos;s growth</span>
            </p>
            <p className="text-lg font-bold mb-5">
              Visibility brings exposure to local customers looking for your
              business. Better exposure means more customers.
            </p>
            <p className="text-sm">
              <CircleCheckBig className="inline-flex text-blue-600 mr-3" />
              We take care of the legwork and ensure maximum exposure
            </p>
            <p className="text-sm mt-5 mb-8">
              <CircleCheckBig color="#155dfc" className="inline-flex mr-3" />
              Rank high on Google Maps and searches with our automated tools
            </p>
            <Link
              href="/sign-up"
              className="px-7.5 py-2.5 rounded-xs bg-green-500 text-white font-medium text-lg hover:bg-green-400 hover:text-white"
            >
              Start For Free
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
