import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";

export const Navbar = () => {
  const user = null;
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* <MobileNav /> */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <p className="font-bold">LOGO</p>

                  {/* <Icons.logo className="h-10 w-10" /> */}
                </Link>
              </div>

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
                      })}, hover:bg-blue-600 hover:text-white`}
                    >
                      Create account
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};
