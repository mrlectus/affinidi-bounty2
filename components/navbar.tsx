import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { createUser, getUserProfile } from "@/utils/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SVGBookmark, SVGProfile } from "./icons/icons";
import { ModeToggle } from "./mode-toggle";

/**
 * Renders the navbar component which displays site branding,
 * navigation links, and user account controls.
 *
 * Uses authentication utils to get user profile data and render
 * appropriate UI based on auth state.
 */
export const Navbar = async () => {
  const { nickname, email, givenName, picture } = await getUserProfile();
  await createUser(email as string);
  return (
    <nav className="dark:bg-black dark:border-b-purple-800 dark:border-2 flex md:justify-around md:flex-row bg-[#f5f5f5] shadow-xl min-h-24 py-4 items-center flex-col gap-2">
      <div>
        <Link href="/" className="text-xl font-bold">
          StackJobs
        </Link>
      </div>
      <div className="flex">
        <ul className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
          {email && (
            <>
              <li>
                <span className="font-bold">Welcome, </span>
                {nickname ? nickname : givenName}
              </li>
              <li>
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarImage src={picture as string} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2">
                    <p>{email}</p>
                    <Link
                      href="/profile"
                      className="flex items-center w-full gap-2 rounded-md h-10 hover:bg-gray-100 dark:hover:bg-purple-600"
                    >
                      <SVGProfile /> Profile
                    </Link>
                    <Link
                      prefetch={false}
                      href="/bookmarks"
                      className="flex items-center w-full gap-2 rounded-md h-10 hover:bg-gray-100 dark:hover:bg-purple-600"
                    >
                      <SVGBookmark /> Bookmarks
                    </Link>
                  </PopoverContent>
                </Popover>
              </li>
            </>
          )}
          <li
            className={clsx(
              "flex items-center gap-2 cursor-pointer p-2 rounded-md drop-shadow-lg",
              {
                "bg-blue-700 hover:bg-blue-600": !email,
                "bg-red-700 hover:bg-red-600": email,
              }
            )}
          >
            {!email ? (
              <>
                <Image
                  alt="affindi logo"
                  src={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAExUlEQVRoge2ZT2iURxjGf+/styZmq1WjiSQbkSYYCwVrRNCDUJUehEqhQrSHilpq1UsvxYMglUov0ksp2CoE+8eDUPDQQy/9Z/9SWoyeihW1rckGjTVWaVw3uztPD18SNcluvk2yyR7ywMB++80z87zzzbzvvDMwi1lMCjZF7cSgJQH354SPNQNwpR/IR2+iPgEkwBSdE+QnaEBDDbi1YBswrQGWA7VA1WCFDNAH/IXsPOgHyP4GN/sLt9l4CGeHgPsRRcQQV4MShbfi3B7ENqAZVGzAmoBVwIvhY/waljyL9x3Qc2lUbWfzEAlQIpIUA7C7LprwZCOu8TjmLiAOYmrGiop/pCMNlaeQ3sTcBVzyBDQmR1T02KCwKCVEPoIBja9gdILtxzS3pCk6yhgDUzXSXsw6oWnXxBsLUcSANfFw1PkEUx1MQvgwBtswwLQE06nwawAoN4E+rMAaaJmP9Z5GtvXRfssCsRe3bCH+eg/UgKsFRe+wgBdqrAV7BpSZIpnjIGULNv+0Pt395e+ZP47chuUxyI5HMiA9DeKioe5lHavfoY5SeRG9UPlhyuWk/J4l23O7S+FVjAFeeCQMHWvYoaaovIoxICbnAQxbnPP5w1F5g16oqRnT+0CM8vqcsaHufPqfX1ur69aB8oB2xlccXp69fDSPJQs4GjmM7tAAx6ugLdOneKQW8Nl7w4/mgqq5S597Pnv56KCfLDCmsi4H9Qmkl6ZF6Jgihn6EIV4SSMxZtEo2b4Pwd4qxMw6CdcCKMsuMDDMDPLGqhRZPbhH0U2zX73BuU9EaMwBJYI6q2tXj1g2QNoasmbJhaA6NFhAkmkIvKc8ohxnWnhsgTgGfMxPe56GSgXhi2QtIm4b/kydINPZS3fYeDy7moOFxA4WB+ipm6izdoSPe594yLPwWEmbu76f3uZZzGy1XiFcxgSzvc/HhpTi8G1XNpeMsLMarGAMmiooxIOaC7MOEZ2hm2/2VBygaCAJIvkZ4ojBDixige2Dg30sb4k+2An5o/uOz96rPbdl8ENzoRRyu9L4AYzewfgZUD0IgyPZfJ75g5cNhNEeuP1XPg853sIbRNANkPQFm3yKtn1SyPhk8vpV4bJRz/V1hADBHgQmSdnj/TaG3MwWzMA5kbl8Yt66D3C/A5fLLigZJgCOfuaNs1xcGT1BsfB3c7Mfs7LQpHInhSRNuJcwMzBjou2j670fDLSjGrgrzAU8HZs8yUwkN5F18fivQDCCfy6RvfPc9kA+3DGNtGMKEZlpVFsPS9vzbde1Z1W/Pqa49dzIqr2ICWd68AxC6FbjY0ai8Ek+nywdnOIUbuYM9Z6wrKq9iDJAFgUFH7xn7qBReAQOm/2gx3fvzjXTqq6+BtaUcLRbIB1rmY5nToK1TK7SQFPdZeLibeAO3qJTD3asFFvGVe6huG2Yfhh2oPAXAOIm/3o5L3g19vi+JX8QLnc/iu/Yj7UTWOzV5/yNtyG4h7cJ3vz74LphAH4rgRlOfItpAHyBLTy75F8jS4E4gtUHq40k0BkSOA90pfOoA8qsxjiG7iizaScZQPdk1sHeRb8N37YPUiCgqhyByCREr9zXrn8g6y3nNOoUX3YtrYM6gAdN30V2KyFnMYgz8D4yD44VCwb0lAAAAAElFTkSuQmCC"
                  }
                  width={24}
                  height={24}
                />
                <a href="/api/auth/login" className="text-white font-bold">
                  Login
                </a>
              </>
            ) : (
              <>
                <a href="/api/auth/logout" className="text-white font-bold">
                  Logout
                </a>
              </>
            )}
          </li>
        </ul>
      </div>
      <ModeToggle />
    </nav>
  );
};
