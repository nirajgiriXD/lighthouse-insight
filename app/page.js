/**
 * External dependencies.
 */
import Image from "next/image";

/**
 * Internal dependencies.
 */
import lighthouseIcon from "../public/google-lighthouse.svg";

export default function Home() {
  return (
    <main className="max-w-c-1390 w-full flex flex-col gap-12 md:gap-24 items-center p-24">
      <div className="flex flex-col items-center w-full">
        <Image
          priority
          src={lighthouseIcon}
          alt="Google Lighthouse"
          height={60}
          width={60}
          className="mb-8 shadow-lg rounded-full"
        />
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-gray-900">
          Lighthouse Insight
        </h1>
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font">
          Generate and Compare Lighthouse Report
        </h2>
      </div>

      <div className="mb-32 grid gap-6 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <a
          href="/single-page"
          className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Single Page{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Generate lighthouse report for single webpage.
          </p>
        </a>

        <a
          href="/multiple-pages"
          className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Multiple Pages{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Generate lighthouse report for multiple webpages.
          </p>
        </a>

        <a
          href="/compare-report"
          className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Compare Report{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Generate and compare lighthouse report.
          </p>
        </a>
      </div>
    </main>
  );
}
