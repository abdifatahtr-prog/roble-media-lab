import Script from "next/script";

// GA4 loader. Renders nothing unless NEXT_PUBLIC_GA_ID is set, so analytics stays
// opt-in and the site never ships an empty tag. Loads after hydration to keep it
// off the critical path (no impact on LCP/performance).
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
