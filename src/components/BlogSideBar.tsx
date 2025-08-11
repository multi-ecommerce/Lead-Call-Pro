import Link from "next/link";

import { ArrowRight } from "lucide-react";

export default function BlogSideBar() {
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white shadow-md p-8">
        <h1 className="text-3xl font-extrabold mb-4">Lead Call Pro</h1>
        <p>
          Lead Call Pro uses programmatic tools and unique processes to help
          businesses improve their exposure, gain new customers, and pay based
          on results.
        </p>
        <Link
          href="/about"
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
            <Link
              href="/blog/plumbing"
              className="font-semibold hover:text-blue-600"
            >
              Plumbing
            </Link>
            <p className="text-sm">5</p>
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/blog/hvac"
              className="font-semibold hover:text-blue-600"
            >
              HVAC
            </Link>
            <p className="text-sm">5</p>
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/blog/roofing"
              className="font-semibold hover:text-blue-600"
            >
              Roofing
            </Link>
            <p className="text-sm">5</p>
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/blog/electrician"
              className="font-semibold hover:text-blue-600"
            >
              Electrician
            </Link>
            <p className="text-sm">5</p>
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/blog/pest-control"
              className="font-semibold hover:text-blue-600"
            >
              Pest Control
            </Link>
            <p className="text-sm">5</p>
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/blog/water-damage-restoration"
              className="font-semibold hover:text-blue-600"
            >
              Water Damage Restoration
            </Link>
            <p className="text-sm">5</p>
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/blog/personal-injury-attorney"
              className="font-semibold hover:text-blue-600"
            >
              Personal Injury Attorney
            </Link>
            <p className="text-sm">6</p>
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/blog/appliance-repair"
              className="font-semibold hover:text-blue-600"
            >
              Appliance Repair
            </Link>
            <p className="text-sm">6</p>
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/blog/health-insurance"
              className="font-semibold hover:text-blue-600"
            >
              Health Insurance
            </Link>
            <p className="text-sm">1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
