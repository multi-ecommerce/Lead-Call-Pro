"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    const { error: signUpError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    setLoading(false);
  };

  return (
    <div className="relative flex pt-20 flex-col items-center justify-center lg:px-0 px-3">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          {/* <Icons.logo className='h-20 w-20' /> */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign In an account
          </h1>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/sign-up"
          >
            Don&apos;t have an account?{" "}
            <span className="text-blue-400 font-medium">Sign-Up</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="grid gap-1 py-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="grid gap-1 py-2">
              <Label htmlFor="password">Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              onClick={handleSignup}
              disabled={!isFormValid || loading}
              className="bg-blue-600 text-white disabled:bg-blue-500 hover:bg-blue-400 cursor-pointer"
            >
              {loading ? "Wait.." : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
