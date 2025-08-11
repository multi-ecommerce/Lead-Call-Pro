"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";
import { X } from "lucide-react";

import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import MobileNavbar from "./MobileNavbar";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";
import NavProfile from "./NavProfile";

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname();

  const links = useMemo(
    () => [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
    ],
    []
  );

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
    <div className="sticky z-10 top-0 inset-x-0 h-16 backdrop-blur-sm bg-background/70">
      <header className="relative">
        <div className="border-b border-border">
          <MaxWidthWrapper>
            <div className="flex h-16 items-center px-4">
              <div className="flex lg:ml-0">
                <Link href="/">
                  <p className="text-xl font-bold font-sans text-foreground">Lead Call Pro</p>
                </Link>
              </div>

              {/* ### MOBILE NAVBAR ### */}
              <div className="lg:hidden p-1 rounded-md flex flex-1 items-center justify-end space-x-6">
                {session ? <NavProfile session={session} /> : null}

                <button onClick={toggleNavbar} className="text-primary">
                  {navbar ? <X /> : <Menu />}
                </button>
              </div>

              {navbar && (
                <div className="bg-card">
                  <MobileNavbar
                    session={session}
                    onClose={() => setNavbar(false)}
                  />
                </div>
              )}

              {/* ### MOBILE NAVBAR END ### */}

              {/* ### DESKTOP NAVBAR ### */}

              <div className="hidden md:ml-20 lg:flex">
                <nav className="text-[0.94rem] font-sans grow flex justify-center gap-7">
                  {links.map(({ href, label }) => {
                    const active = pathname === href || pathname?.startsWith(`${href}/`);
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={
                          `transition-colors inline-flex items-center border-b-2 ` +
                          (active
                            ? "text-primary border-primary"
                            : "text-muted-foreground hover:text-foreground border-transparent")
                        }
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>
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
                    <span className="h-6 w-px bg-border" aria-hidden="true" />
                  )}

                  <Link
                    href={session ? "/dashboard" : "/sign-up"}
                    className={`${buttonVariants({
                      variant: "ghost",
                    })} border border-primary rounded-sm hover:bg-primary hover:text-primary-foreground`}
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
}
