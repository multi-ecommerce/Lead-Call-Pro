import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Banner from "../../../../public/about/banner-image.png";
import Feature from "../../../../public/about/feature-thumb.png";
import Testimonial from "../../../../public/about/testimonial-thumb.png";
import Quote from "../../../../public/about/quote.png";
import Commenter from "../../../../public/about/commenter-thumb.png";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | Lead Call Pro",
};

export default function About() {
  return (
    <div>
      <Header heading="About Lead Call Pro" subHeading="WHO WE ARE" />
      <div>
        <MaxWidthWrapper className="py-12">
          <div className="flex flex-wrap flex-col items-center justify-between py-4 gap-12 lg:flex-row lg:gap-18 lg:flex-nowrap w-full text-[#212529]">
            <div>
              <div className="max-w-xl w-full">
                <p className="text-[#aaaaaa] text-lg font-bold">WE ARE</p>
                <p className="text-[#16334e] text-4xl font-extrabold mb-10">
                  A Los Angeles-based Company
                </p>
                <p className="text-[#212529] text-[1rem] mb-4 max-w-lg">
                  Lead Call Pro is a marketing technology company that uses
                  programmatic tools and unique processes to help businesses
                  organically generate calls from local customers.
                </p>
                <p className="text-[#212529] text-[1rem] mb-8 max-w-lg">
                  Lead Call Pro utilizes multiple marketing platforms to drive
                  potential customer calls. With our expertise, we have serviced
                  over 2,000 happy local businesses and generated over 250,000
                  calls from local customers, resulting in improved business
                  presence.
                </p>
                <Link
                  href="/sign-up"
                  className="text-blue-600 font-bold text-lg flex items-center gap-4"
                >
                  Try Lead Call Pro for Free{" "}
                  <ArrowRight
                    size={22}
                    className="bg-blue-600 text-white rounded-full"
                  />
                </Link>
              </div>
            </div>
            <div className="shrink-0">
              <Image src={Banner} alt="Shop Image" width={400} />
            </div>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="py-20">
          <div className="flex flex-wrap flex-col items-center justify-between py-4 gap-12 lg:flex-row lg:gap-10 lg:flex-nowrap w-full text-[#212529]">
            <div>
              <div className="max-w-xl w-full">
                <p className="text-[#aaaaaa] text-lg font-bold">CASE STUDY</p>
                <p className="text-[#16334e] text-4xl font-extrabold mb-10">
                  One of our Successful Stories
                </p>
                <p className="text-[#212529] text-[1rem] mb-8 max-w-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                  illum architecto consequuntur natus beatae, inventore adipisci
                  expedita tempore, reprehenderit impedit perferendis, vero
                  mollitia error! Ex vero quaerat at neque aperiam facilis,
                  quasi, consequuntur, error sint quidem delectus? Sed, expedita
                  dolore.
                </p>
                <Link
                  href=""
                  className="text-blue-600 font-bold text-lg flex items-center gap-4"
                >
                  See full case story
                  <ArrowRight
                    size={22}
                    className="bg-blue-600 text-white rounded-full"
                  />
                </Link>
              </div>
            </div>
            <div className="shrink-0">
              <Image src={Feature} alt="Shop Image" width={500} />
            </div>
          </div>
        </MaxWidthWrapper>
        <MaxWidthWrapper className="py-20">
          <div className="flex flex-wrap flex-col items-center justify-between py-4 gap-12 lg:flex-row lg:gap-10 lg:flex-nowrap w-full text-[#212529]">
            <div>
              <div className="max-w-xl w-full">
                <p className="text-[#16334e] text-4xl font-extrabold mb-8">
                  Check what our{" "}
                  <span className="block">Client Says about us.</span>
                </p>
                <Image src={Quote} alt="Quote" className="mb-8" />
                <p className="text-[#212529] text-[1rem] mb-8 max-w-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam natus laudantium illum possimus necessitatibus saepe
                  quia alias quo eveniet consequatur vero deleniti dolorem fuga
                  odio nostrum, accusantium ipsam, vitae eum earum quis?
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <Image src={Commenter} alt="Commenter" />
                  </div>
                  <div>
                    <p className="font-extrabold">Ali Awan</p>
                    <p>CMO, ABC Company</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <Image src={Testimonial} alt="Shop Image" width={400} />
            </div>
          </div>
        </MaxWidthWrapper>
        <Footer />
      </div>
    </div>
  );
}
