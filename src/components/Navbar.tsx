"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Menu } from "lucide-react";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import MobileNavbar from "./MobileNavbar";

export const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter();
  const user = null;

  function toggleNavbar() {
    setNavbar(!navbar);
  }

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <p className="font-bold">LOGO</p>
                </Link>
              </div>

              {/* ### MOBILE NAVBAR ### */}
              <div className="lg:hidden p-1 rounded-md flex flex-1 items-center justify-end">
                <button onClick={toggleNavbar}>
                  <Menu size={24} color="black" />
                </button>
              </div>

              {navbar && (
                <div className="bg-[#f1f5f9]">
                  <MobileNavbar />
                </div>
              )}

              {/* ### MOBILE NAVBAR END ### */}

              {/* ### DESKTOP NAVBAR ### */}

              <div className="hidden md:ml-20 lg:flex">
                <div className="text-[0.94rem] [&_ul:hover]:text-blue-600 [&_ul]:opacity-60 grow flex justify-center gap-7">
                  <ul>
                    <Link href="/">About Us</Link>
                  </ul>
                  <ul>
                    <Link href="/">Blog</Link>
                  </ul>
                </div>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    // <UserAccountNav user={user} />
                    <p></p>
                  ) : (
                    <Link
                      href="/sign-up"
                      className={`${buttonVariants({
                        variant: "ghost",
                      })}, border-2 border-blue-600 hover:bg-blue-600 hover:text-white`}
                    >
                      Try ResultCalls
                    </Link>
                  )}
                </div>
              </div>

              {/* ### DESKTOP NAVBAR END ### */}
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};
