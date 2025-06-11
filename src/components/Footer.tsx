import Link from "next/link";
import React from "react";

import { footerDetails } from "@/data/footer";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 text-[#171717] py-10 border-t">
      <MaxWidthWrapper>
        <div className=" w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 font-sans">
          <div>
            <Link href="/" className="flex items-center gap-2">
              {/* <FaFingerprint className="min-w-fit w-5 h-5 md:w-7 md:h-7" /> */}
              <h3 className="manrope text-xl font-semibold cursor-pointer">
                Lead Call Pro
              </h3>
            </Link>
            <p className="mt-3.5 text-[#454545] w-3/4">
              {footerDetails.subheading}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="text-[#454545]">
              {footerDetails.quickLinks.map((link) => (
                <li key={link.text} className="mb-2">
                  <Link href={link.url} className="hover:text-foreground">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>

            {footerDetails.email && (
              <a
                href={`mailto:${footerDetails.email}`}
                className="block text-[#454545] hover:text-foreground"
              >
                Email: {footerDetails.email}
              </a>
            )}

            {footerDetails.telephone && (
              <a
                href={`tel:${footerDetails.telephone}`}
                className="block text-[#454545] hover:text-foreground"
              >
                Phone: {footerDetails.telephone}
              </a>
            )}
          </div>
        </div>
        <div className="mt-8 md:text-center text-[#454545] px-6">
          <p>
            Copyright &copy; {new Date().getFullYear()} Lead Call Pro. All
            rights reserved.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
