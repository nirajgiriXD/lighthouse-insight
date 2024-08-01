/**
 * Internal dependencies.
 */
import { ReportsComparision } from "../../components";

export const metadata = {
  title: "Compare Reports",
};

export default function Home() {
  return (
    <div className="px-4">
      <ReportsComparision />
    </div>
  );
}
