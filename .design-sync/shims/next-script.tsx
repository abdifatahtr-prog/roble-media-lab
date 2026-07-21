// Shim for `next/script`, used only by the design-sync bundle.
// Analytics/tag scripts have no place in a design preview, so this renders nothing.
export default function Script(_props: Record<string, unknown>) {
  return null;
}
