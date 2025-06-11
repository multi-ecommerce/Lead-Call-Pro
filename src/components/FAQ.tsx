"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Minus, Plus } from "lucide-react";

import { faqs } from "@/data/faq";
import MaxWidthWrapper from "./MaxWidthWrapper";

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-10 lg:py-20">
      <MaxWidthWrapper>
        <div className="flex flex-col lg:flex-row gap-10 font-sans">
          <div className="">
            <p className="hidden lg:block text-foreground-accent">FAQ&apos;S</p>

            <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left text-3xl lg:text-5xl lg:leading-tight font-bold">
              Frequently Asked Questions
            </h2>
            <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
              Ask us anything!
            </p>
            <a
              href="mailto:"
              className="mt-3 block text-xl lg:text-2xl text-blue-600 font-semibold hover:underline text-center lg:text-left"
            >
              abdulaleem313@yahoo.com
            </a>
          </div>

          <div className="w-full lg:max-w-2xl mx-auto border-b">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-7">
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex items-center justify-between w-full px-4 pt-7 text-lg text-left border-t">
                        <span className="text-lg font-semibold">
                          {faq.question}
                        </span>
                        {open ? (
                          <Minus className="w-5 h-5 text-blue-600 cursor-pointer" />
                        ) : (
                          <Plus className="w-5 h-5 text-blue-600 cursor-pointer" />
                        )}
                      </DisclosureButton>
                      <DisclosurePanel className="px-4 pt-4 pb-2 text-[#454545]">
                        {faq.answer}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default FAQ;
