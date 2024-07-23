import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/Header";

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
        <div className="px-4">{children}</div>
      </body>
    </html>
  );
}
