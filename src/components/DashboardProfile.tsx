"use client";
import { ArrowDown, BadgeHelp, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/fetchUserData";

type User = {
  name: string;
};

export default function DashboardProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUserData();
      setUser(data);
    };

    getUser();
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleNavbar}
        className="cursor-pointer flex items-center"
      >
        <span className="mr-2 self-auto">{user?.name}</span>
        <ArrowDown size={18} />
      </button>

      {!isOpen ? null : (
        <div className="absolute mt-2 right-0 bg-white border rounded shadow-md z-50 p-1 w-36 text-xs overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            className="w-full rounded-sm justify-start"
          >
            <User size={16} />
            Profile
          </Button>
          <div className="border-t my-1" />

          <Button
            variant="ghost"
            size="sm"
            className="w-full rounded-sm justify-start"
          >
            <BadgeHelp size={16} />
            Help
          </Button>
          <div className="border-t my-1" />

          <Button
            variant="ghost"
            size="sm"
            className="w-full rounded-sm justify-start"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
