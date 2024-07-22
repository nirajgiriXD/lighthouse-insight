/**
 * External dependencies.
 */
import { useRef } from "react";
import Image from "next/image";
import { BarLoader } from "react-spinners";

/**
 * Internal dependencies.
 */
import lighthouseIcon from "../../public/google-lighthouse.svg";

const SinglePageForm = ({ handleSubmit, errorMsg, isLoading }) => {
  const siteUrlRef = useRef(null);

  return (
    <main className="max-w-c-1390 mx-auto w-full">
      <div className="flex justify-center min-h-[calc(100vh-100px)] items-center">
        <div className="flex flex-col items-center gap-12">
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
              Lighthouse Insight - Single Page
            </h1>
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font">
              Lighthouse report will be generated for the specified URL.
            </h2>
          </div>

          <div className="w-96 min-w-[200px]">
            {isLoading ? (
              <BarLoader
                color="#36D7B7"
                cssOverride={{
                  display: "block",
                  margin: "0 auto",
                  borderColor: "red",
                }}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="w-full"
              />
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(siteUrlRef.current.value);
                }}
              >
                <div className="flex w-full gap-4 h-10">
                  <div className="relative w-full shadow-sm">
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=" "
                      type="url"
                      ref={siteUrlRef}
                      required
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Site URL
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="inline-block h-full text-gray-600 hover:text-gray-900 text-sm shadow-sm border border-blue-gray-200 hover:bg-gray-100 px-4 rounded-md"
                  >
                    Submit
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-red-900 text-sm mt-4">{errorMsg}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SinglePageForm;
