"use client";

/**
 * External dependencies.
 */
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

/**
 * Internal dependencies.
 */
import logo from "../public/logo.png";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  const pathname = usePathname();

  const NO_HEADER_PATHS = ["/single-page/report", "/multiple-pages/report"];

  useEffect(() => {
    const resize = () => {
      window.innerWidth >= 960 && setOpenNav(false);
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/single-page" className="flex items-center">
          Single Page
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/multiple-pages" className="flex items-center">
          Multiple Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/reports-comparision" className="flex items-center">
          Reports Comparision
        </a>
      </Typography>
    </ul>
  );

  return (
    <div
      className={`w-[100vw] border shadow-sm overflow-auto ${
        NO_HEADER_PATHS.includes(pathname) ? "hidden" : ""
      }`}
    >
      <Navbar className="sticky top-0 z-10 w-full max-w-screen-2xl mx-auto rounded-none py-2 lg:py-4 border-none outline-none shadow-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link href="/">
            <Image src={logo} alt="Logo" width={34} height={34} />
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="h-6 w-6 mr-2 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <div className="pt-4">{navList}</div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
