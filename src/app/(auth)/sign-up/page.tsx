"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";

export default function SignUp() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const isFormValid =
    phone.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    category !== "";

  // const handleSignup = async () => {
  //   setLoading(true);
  //   setError("");

  //   const { data: signupData, error: signupError } = await supabase.auth.signUp(
  //     {
  //       email,
  //       password,
  //     }
  //   );

  //   if (signupError) {
  //     if (signupError.message.toLowerCase().includes("already registered")) {
  //       setError("User already exists — please try another email.");
  //     } else {
  //       setError(signupError.message);
  //     }
  //     setLoading(false);
  //     return;
  //   }

  //   alert("Please verify your email in 30 sec. Waiting for verification...");

  //   const maxAttempts = 5; // Total wait time = 5 * 2s = 10 seconds
  //   let attempt = 0;
  //   let sessionUser = null;

  //   while (attempt < maxAttempts) {
  //     const { data: sessionData } = await supabase.auth.getSession();
  //     sessionUser = sessionData?.session?.user;

  //     if (sessionUser) break;

  //     await new Promise((resolve) => setTimeout(resolve, 6000)); // Wait 2 seconds
  //     attempt++;
  //   }

  //   if (!sessionUser) {
  //     setError("Email not verified yet. Please try logging in later.");
  //     setLoading(false);
  //     return;
  //   }

  //   // Insert extra user data into your custom "users" table
  //   const { error: insertError } = await supabase.from("users").insert([
  //     {
  //       id: sessionUser.id,
  //       email: sessionUser.email,
  //       phone,
  //       category,
  //     },
  //   ]);

  //   if (insertError) {
  //     console.error("Insert error:", insertError);
  //     setError(insertError.message);
  //   } else {
  //     router.push("/dashboard");
  //   }

  //   setLoading(false);
  // };

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    // Insert extra user info if signup is successful
    if (user) {
      const { error: insertError } = await supabase.from("users").insert({
        id: user.id, // or use user.email if you want email as unique
        email: user.email,
        phone,
        category,
      });

      if (insertError) {
        if (insertError.message.includes("users_email_key")) {
          setError("User already exists. Try another email.");
        } else {
          setError(insertError.message);
        }
      } else {
        console.log("Signup successful!");
        router.push("/sign-in");
      }
    }

    setLoading(false);
  };

  return (
    <div className="relative flex pt-20 flex-col items-center justify-center lg:px-0 px-3">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          {/* <Icons.logo className='h-20 w-20' /> */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/sign-in"
          >
            Already have an account?{" "}
            <span className="text-blue-400 font-medium">Sign-In</span>
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
                // className={cn({
                //   "focus-visible:ring-red-500": error,
                // })}
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
                // className={cn({
                //   "focus-visible:ring-red-500": error,
                // })}
                placeholder="Password"
                required
              />
            </div>

            <div className="grid gap-1 py-2">
              <Label htmlFor="password">Phone Number</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                pattern="[0-9]{4}-[0-9]{7}"
                maxLength={11}
                placeholder="0300-0000000"
                required
                // className={cn({
                //   "focus-visible:ring-red-500": error,
                // })}
              />
            </div>

            <div className="grid gap-1 py-2">
              <Label htmlFor="password">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Air Conditioning Contractor">
                    Air Conditioning Contractor
                  </SelectItem>
                  <SelectItem value="Electrician">Electrician</SelectItem>
                  <SelectItem value="Appliance Repair Service">
                    Appliance Repair Service
                  </SelectItem>
                  <SelectItem value="Garage Door Installation & Repair">
                    Garage Door Installation & Repair
                  </SelectItem>
                  <SelectItem value="Bathroom Remodeler">
                    Bathroom Remodeler
                  </SelectItem>
                  <SelectItem value="Flooring">Flooring</SelectItem>
                  <SelectItem value="Health Insurance">
                    Health Insurance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              onClick={handleSignup}
              disabled={!isFormValid || loading}
              className="bg-blue-600 text-white disabled:bg-blue-500 hover:bg-blue-400 cursor-pointer"
            >
              {loading ? "Wait.." : "Sign up"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
