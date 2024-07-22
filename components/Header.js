"use client";

/**
 * External dependencies.
 */
import Link from "next/link";
import Image from "next/image";

/**
 * Internal dependencies.
 */
import lighthouseIcon from "../public/google-lighthouse.svg";

const Header = () => {
  return (
    <div className="w-full h-14 bg-gray-100 shadow-md sticky top-0">
      <div className="flex justify-between items-center px-4 py-2 max-w-screen-xl mx-auto">
        <Link href="/">
          <Image
            priority
            src={lighthouseIcon}
            alt="Google Lighthouse"
            height={36}
            width={36}
            className="shadow-lg rounded-full"
          />
        </Link>
        <nav>
          <ul className="flex gap-8 text-sm">
            <li
              onClick={() => (window.location.href = "/single-page")}
              className="hover:cursor-pointer"
            >
              Single Page
            </li>
            <li
              onClick={() => (window.location.href = "/multiple-pages")}
              className="hover:cursor-pointer"
            >
              Multiple Page
            </li>
            <li
              onClick={() => (window.location.href = "/compare-report")}
              className="hover:cursor-pointer"
            >
              Compare Report
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
