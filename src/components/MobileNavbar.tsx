import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonVariants } from "./ui/button";
import { Session } from "@supabase/supabase-js";

export default function MobileNavbar({ session }: { session: Session | null }) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timeout = setTimeout(() => setAnimateIn(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`
        fixed top-[4.2rem] left-1/2 -translate-x-1/2 w-[90%] bg-white z-40 shadow-md 
        transform transition-transform duration-300 ease-in-out overflow-auto
        ${animateIn ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="p-5">
        <div className="text-lg font-medium [&_ul:hover]:text-blue-600 [&_ul]:opacity-60 grow flex flex-col justify-start gap-y-1 pb-5 border-b-2">
          <ul>
            <Link href="/">About Us</Link>
          </ul>
          <ul>
            <Link href="/">Blog</Link>
          </ul>
        </div>
        <div className="flex items-center justify-center pt-3 gap-4">
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
            <span className="h-6 w-px bg-gray-200 " aria-hidden="true" />
          )}
          {!session ? (
            <Link
              href="/sign-up"
              className={`${buttonVariants({
                variant: "ghost",
              })}, border rounded-sm border-blue-600 hover:bg-blue-600 hover:text-white`}
            >
              Try Lead Call Pro
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className={`${buttonVariants({
                variant: "ghost",
              })}, border rounded-sm border-blue-600 hover:bg-blue-600 hover:text-white`}
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
