import BlogPosts from "@/components/BlogPosts";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Blog() {
  return (
    <div>
      <div className="bg-[url('/images/page-header-bg.webp')] bg-cover bg-center bg-no-repeat h-[32rem] w-full flex items-center px-8 lg:px-20 relative -top-16">
        <div className="text-white mt-24">
          <p className="text-lg font-semibold pl-1">BLOG POST</p>
          <p className="text-5xl font-bold">Latest News</p>
        </div>
      </div>
      <MaxWidthWrapper className="py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-3/8">
            <BlogPosts />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-8">
              <div className="bg-white shadow-md p-8">
                <h1 className="text-3xl font-extrabold mb-4">Lead Call Pro</h1>
                <p>
                  ResultCalls uses programmatic tools and unique processes to
                  help businesses improve their exposure, gain new customers,
                  and pay based on results.
                </p>
                <Link
                  href=""
                  className="text-blue-600 font-bold flex items-center gap-4 mt-4"
                >
                  View Details
                  <ArrowRight
                    size={22}
                    className="bg-blue-600 text-white rounded-full"
                  />
                </Link>
              </div>
              <div className="bg-white shadow-md p-8">
                <h1 className="text-3xl font-semibold mb-4">Solutions</h1>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <Link href="" className="font-semibold hover:text-blue-600">
                      Plumbing
                    </Link>
                    <p className="text-sm">5</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="" className="font-semibold hover:text-blue-600">
                      HVAC
                    </Link>
                    <p className="text-sm">5</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="" className="font-semibold hover:text-blue-600">
                      Roofing
                    </Link>
                    <p className="text-sm">5</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="" className="font-semibold hover:text-blue-600">
                      Electrician
                    </Link>
                    <p className="text-sm">5</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="" className="font-semibold hover:text-blue-600">
                      Pest Control
                    </Link>
                    <p className="text-sm">5</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="" className="font-semibold hover:text-blue-600">
                      Water Damage Restoration
                    </Link>
                    <p className="text-sm">5</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="" className="font-semibold hover:text-blue-600">
                      Personal Injury Attorney
                    </Link>
                    <p className="text-sm">6</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="" className="font-semibold hover:text-blue-600">
                      Appliance Repair
                    </Link>
                    <p className="text-sm">6</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link href="" className="font-semibold hover:text-blue-600">
                      Health Insurance
                    </Link>
                    <p className="text-sm">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
}
