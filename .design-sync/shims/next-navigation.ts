// Shim for `next/navigation`, used only by the design-sync bundle.
//
// These hooks read App Router context. Outside Next that context is absent and the
// real hooks throw, taking the whole preview down. Static stand-ins keep components
// that only *read* the path (Header's active-nav state) rendering correctly.

export function usePathname(): string {
  return "/";
}

export function useRouter() {
  return {
    push: () => {},
    replace: () => {},
    refresh: () => {},
    back: () => {},
    forward: () => {},
    prefetch: () => {}
  };
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams();
}

export function useParams(): Record<string, string> {
  return {};
}
