"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { buttonVariants } from "./ui/button";
import { Session } from "@supabase/supabase-js";

interface MobileNavbarProps {
  session: Session | null;
  onClose: () => void;
}

export default function MobileNavbar({ session, onClose }: MobileNavbarProps) {
  const [animateIn, setAnimateIn] = useState(false);
  const pathname = usePathname();
  const links = useMemo(
    () => [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
    ],
    []
  );

  useEffect(() => {
    // Trigger animation on mount
    const timeout = setTimeout(() => setAnimateIn(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`
        fixed top-[4.2rem] left-1/2 -translate-x-1/2 w-[90%] bg-card z-40 shadow-md 
        transform transition-transform duration-300 ease-in-out overflow-auto
        ${animateIn ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="p-5">
        <div className="text-lg font-medium grow flex flex-col justify-start gap-y-1 pb-5 border-b-2 border-border">
          {links.map(({ href, label }) => {
            const active = pathname === href || pathname?.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={
                  "px-1 py-2 rounded-sm transition-colors " +
                  (active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center justify-center pt-3 gap-4">
          {session ? null : (
            <Link
              href="/sign-in"
              onClick={onClose}
              className={buttonVariants({
                variant: "ghost",
              })}
            >
              Sign in
            </Link>
          )}
          {session ? null : (
            <span className="h-6 w-px bg-border " aria-hidden="true" />
          )}
          <Link
            href={session ? "/dashboard" : "/sign-up"}
            onClick={onClose}
            className={`${buttonVariants({
              variant: "ghost",
            })} border rounded-sm border-primary hover:bg-primary hover:text-primary-foreground`}
          >
            {session ? "Dashboard" : "Try Lead Call Pro"}
          </Link>
        </div>
      </div>
    </div>
  );
}
