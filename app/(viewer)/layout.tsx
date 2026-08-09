/**
 * Full-bleed shell for report viewers: the Lighthouse report itself is the
 * interface, so the app chrome steps out of the way.
 */
export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-dvh flex-col overflow-hidden bg-canvas">{children}</div>;
}
