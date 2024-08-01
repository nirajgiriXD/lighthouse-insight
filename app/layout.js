/**
 * External dependencies.
 */
import { Inter } from "next/font/google";

/**
 * Internal dependencies.
 */
import "../styles/globals.css";
import Header from "../components/Header";
import { ReportProvider } from "../contexts/reportContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lighthouse Insight",
  description: "Generate and Compare Lighthouse Report",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ReportProvider>{children}</ReportProvider>
      </body>
    </html>
  );
}
