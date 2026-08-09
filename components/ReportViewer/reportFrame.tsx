/**
 * Internal dependencies.
 */
import { cn } from "../../utils";

/**
 * The Lighthouse HTML report, rendered exactly as Lighthouse produced it.
 */
export const ReportFrame = ({
  html,
  title,
  className,
}: {
  html: string;
  title: string;
  className?: string;
}) => (
  <iframe
    srcDoc={html}
    title={title}
    className={cn("size-full flex-1 border-0 bg-white", className)}
  />
);
