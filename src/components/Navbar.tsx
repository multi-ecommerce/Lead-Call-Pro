"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Menu } from "lucide-react";
import { X } from "lucide-react";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import MobileNavbar from "./MobileNavbar";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import NavProfile from "./NavProfile";

export const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  function toggleNavbar() {
    setNavbar(!navbar);
  }

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="bg-white sticky z-10 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <div className="border-b border-gray-200">
          <MaxWidthWrapper>
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <p className="text-xl font-bold font-sans">Lead Call Pro</p>
                </Link>
              </div>

              {/* ### MOBILE NAVBAR ### */}
              <div className="lg:hidden p-1 rounded-md flex flex-1 items-center justify-end space-x-6">
                {session ? <NavProfile session={session} /> : null}

                <button onClick={toggleNavbar}>
                  {navbar ? <X color="blue" /> : <Menu color="blue" />}
                </button>
              </div>

              {navbar && (
                <div className="bg-[#f1f5f9]">
                  <MobileNavbar session={session} />
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
                  {session ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  )}

                  {session ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  <Link
                    href={session ? "/dashboard" : "/sign-up"}
                    className={`${buttonVariants({
                      variant: "ghost",
                    })}, border border-blue-600 rounded-sm hover:bg-blue-600 hover:text-white`}
                  >
                    {session ? "Dashboard" : "Try Lead Call Pro"}
                  </Link>

                  {session ? <NavProfile session={session} /> : null}
                </div>
              </div>

              {/* ### DESKTOP NAVBAR END ### */}
            </div>
          </MaxWidthWrapper>
        </div>
      </header>
    </div>
  );
};
