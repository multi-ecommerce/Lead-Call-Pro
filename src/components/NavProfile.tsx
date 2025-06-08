"use client";

import { Session } from "@supabase/supabase-js";
import { User, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function NavProfile({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  async function logOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleNavbar}
        className="hover:bg-gray-100 rounded-full lg:p-2 p-[0.2rem] border cursor-pointer"
      >
        <User size={16} />
      </button>

      {!isOpen ? null : (
        <div className="absolute mt-2 right-0 bg-white border rounded shadow-md z-50 p-2 w-52 text-xs overflow-hidden">
          <p className="truncate mb-3 flex flex-1 items-center justify-center">
            <User size={16} className="mr-2" />
            {session?.user.email}
          </p>
          <div className="border-t my-1" />
          <Button
            onClick={logOut}
            variant="ghost"
            size="sm"
            className="w-full rounded-sm"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
