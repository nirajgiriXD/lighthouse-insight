"use client";

/**
 * External dependencies.
 */
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full p-4 h-14 bg-gray-100 shadow-md sticky top-0">
      <nav>
        <ul className="flex gap-8 text-sm">
          <li>
            <Link href="/">Home</Link>
          </li>
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
  );
};

export default Header;
