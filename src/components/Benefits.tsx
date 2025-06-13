import Image from "next/image";
import Link from "next/link";

import MaxWidthWrapper from "./MaxWidthWrapper";
import Image1 from "../../public/image.jpg";

export default function Benefits() {
  return (
    <MaxWidthWrapper className="py-12 lg:py-20">
      <div className="flex flex-wrap flex-col items-center justify-center px-6 py-4 gap-10 lg:flex-row lg:gap-20 lg:flex-nowrap w-full">
        <div>
          <Image src={Image1} alt="Shop Image" width={400} />
        </div>
        <div className="max-w-xl w-full">
          <div>
            <p className="text-[#16334] text-4xl font-extrabold mb-10">
              Visibility is crucial{" "}
              <span className="block"> to your business's growth</span>
            </p>
            <p className="text-lg font-bold mb-5">
              Visibility brings exposure to local customers looking for your
              business. Better exposure means more customers.
            </p>
            <p className="text-sm">
              We take care of the legwork and ensure maximum exposure
            </p>
            <p className="text-sm mt-5 mb-8">
              Our practical process has helped 2,000+ local businesses
            </p>
            <Link
              href="/sign-up"
              className="px-7.5 py-2.5 rounded-xs bg-green-500 text-white font-medium text-lg hover:bg-green-400 hover:text-white "
            >
              Start For Free
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
