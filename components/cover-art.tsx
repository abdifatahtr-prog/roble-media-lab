/**
 * The Roble Media Lab illustration system for article covers.
 *
 * One SVG scene per post, all drawn from the same small vocabulary so the
 * Insights section reads as one publication: rounded cards and nodes on the
 * panel's ink gradient, light blue-grey linework (#a9b5c9 on translucent
 * white fills), ONE teal focal element per scene (with a soft glow ring),
 * and no text inside the artwork. Each scene should explain the article at
 * a glance — a reader scrolling the blog should be able to tell posts apart
 * by illustration alone.
 *
 * Adding a post: draw a new scene component on the 480x270 viewBox using the
 * palette below, register it under the post's slug in ART. Until then the
 * post falls back to the plain branded panel, so nothing ever breaks.
 */

import type { JSX } from "react";

// Palette. Line/fill values echo the site's dark-surface tokens (see
// globals.css: --teal-light, principle/footer greys).
const C = {
  line: "#a9b5c9", // primary linework
  soft: "#dbe7f4", // text-line strokes inside focal elements
  dimStroke: "rgba(255,255,255,.16)", // secondary/background linework, connectors
  dimFill: "rgba(255,255,255,.05)", // card fills
  teal: "#53d8c8", // the ONE focal accent per scene
  tealDim: "rgba(83,216,200,.14)", // focal fills
  tealGlow: "rgba(83,216,200,.25)", // focal glow rings
  green: "#25D366", // WhatsApp only
  faint: "rgba(255,255,255,.22)" // dot grids, de-emphasised marks
} as const;

/** WhatsApp chats converging into one automated workflow node, then flowing
 *  out as a handled reply and a human handoff. */
function WhatsAppFrontDesk() {
  return (
    <svg viewBox="0 0 480 270" fill="none" aria-hidden="true">
      {/* incoming chat bubbles */}
      <g stroke={C.line} strokeWidth="2">
        <rect x="24" y="36" width="120" height="40" rx="13" fill={C.dimFill} />
        <path d="M40 76 l-7 13 16 -7 z" fill={C.dimFill} />
        <rect x="44" y="104" width="132" height="44" rx="13" fill={C.dimFill} />
        <path d="M60 148 l-7 13 16 -7 z" fill={C.dimFill} />
        <rect x="24" y="176" width="112" height="40" rx="13" fill={C.dimFill} />
        <path d="M40 216 l-7 13 16 -7 z" fill={C.dimFill} />
      </g>
      <g stroke={C.line} strokeWidth="2.5" strokeLinecap="round" opacity=".65">
        <path d="M42 50 h70 M42 62 h42" />
        <path d="M62 118 h82 M62 132 h50" />
        <path d="M42 190 h62 M42 202 h34" />
      </g>
      {/* unread dots — the one WhatsApp-green cue */}
      <circle cx="144" cy="38" r="5" fill={C.green} />
      <circle cx="176" cy="106" r="5" fill={C.green} />
      <circle cx="136" cy="178" r="5" fill={C.green} />
      {/* converge into the automation node */}
      <g stroke={C.dimStroke} strokeWidth="2">
        <path d="M150 56 Q210 62 238 104" />
        <path d="M182 126 Q212 130 236 131" />
        <path d="M142 196 Q210 206 238 158" />
      </g>
      {/* focal: the workflow node */}
      <rect x="236" y="84" width="104" height="92" rx="22" stroke={C.tealGlow} strokeWidth="2" />
      <rect x="244" y="92" width="88" height="76" rx="18" fill={C.tealDim} stroke={C.teal} strokeWidth="2.5" />
      <rect x="260" y="112" width="4" height="36" rx="2" fill={C.teal} />
      <g stroke={C.soft} strokeWidth="2.5" strokeLinecap="round" opacity=".85">
        <path d="M276 118 h42 M276 130 h30 M276 142 h42" />
      </g>
      {/* out: handled reply + human handoff */}
      <g stroke={C.dimStroke} strokeWidth="2">
        <path d="M336 114 Q366 102 382 90" />
        <path d="M336 146 Q366 158 382 170" />
      </g>
      <circle cx="385" cy="88" r="3" fill={C.teal} />
      <circle cx="385" cy="172" r="3" fill={C.teal} />
      <g stroke={C.line} strokeWidth="2">
        <rect x="390" y="58" width="70" height="56" rx="12" fill={C.dimFill} />
        <rect x="390" y="156" width="70" height="56" rx="12" fill={C.dimFill} />
      </g>
      <circle cx="410" cy="86" r="10" stroke={C.teal} strokeWidth="2" />
      <path d="M405.5 86 l3.5 4 6.5 -8" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g stroke={C.line} strokeWidth="2.5" strokeLinecap="round" opacity=".65">
        <path d="M428 80 h20 M428 92 h13" />
      </g>
      <circle cx="410" cy="177" r="7" stroke={C.line} strokeWidth="2" />
      <path d="M399 198 q11 -11 22 0" stroke={C.line} strokeWidth="2" strokeLinecap="round" />
      <g stroke={C.line} strokeWidth="2.5" strokeLinecap="round" opacity=".65">
        <path d="M428 179 h20 M428 191 h13" />
      </g>
    </svg>
  );
}

/** Documented process first: an audited checklist feeding a decision tree
 *  where the mapped path is kept (teal, checked) and a step is removed. */
function AutomationBeforeTools() {
  return (
    <svg viewBox="0 0 480 270" fill="none" aria-hidden="true">
      {/* the process document */}
      <rect x="40" y="64" width="86" height="120" rx="12" fill={C.dimFill} stroke={C.line} strokeWidth="2" />
      <g stroke={C.line} strokeWidth="2.5" strokeLinecap="round" opacity=".65">
        <path d="M56 88 h52 M56 104 h38 M56 120 h52" />
      </g>
      <circle cx="64" cy="154" r="9" stroke={C.teal} strokeWidth="2" />
      <path d="M60 154 l3 3.5 6 -7" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M82 154 h26" stroke={C.line} strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
      {/* into the map */}
      <path d="M126 124 H164" stroke={C.dimStroke} strokeWidth="2" />
      <circle cx="182" cy="124" r="11" fill={C.dimFill} stroke={C.line} strokeWidth="2" />
      {/* kept path (focal) */}
      <path d="M191 116 Q216 100 244 91" stroke={C.dimStroke} strokeWidth="2" />
      <rect x="242" y="64" width="78" height="54" rx="14" stroke={C.tealGlow} strokeWidth="2" />
      <rect x="248" y="70" width="66" height="42" rx="11" fill={C.tealDim} stroke={C.teal} strokeWidth="2.5" />
      <path d="M270 91 l5 5 11 -12" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M314 91 H346" stroke={C.dimStroke} strokeWidth="2" />
      <rect x="350" y="70" width="66" height="42" rx="11" fill={C.tealDim} stroke={C.teal} strokeWidth="2.5" />
      <g stroke={C.soft} strokeWidth="2.5" strokeLinecap="round" opacity=".85">
        <path d="M364 85 h38 M364 97 h26" />
      </g>
      <path d="M416 91 H444" stroke={C.teal} strokeWidth="2.5" />
      <polygon points="444,84 456,91 444,98" fill={C.teal} />
      {/* removed step */}
      <path d="M191 132 Q216 148 244 157" stroke={C.dimStroke} strokeWidth="2" strokeDasharray="4 6" />
      <rect x="248" y="138" width="66" height="42" rx="11" stroke={C.dimStroke} strokeWidth="2" strokeDasharray="4 6" />
      <g stroke={C.line} strokeWidth="2.5" strokeLinecap="round" opacity=".75">
        <path d="M273 151 l16 16 M289 151 l-16 16" />
      </g>
    </svg>
  );
}

/** One AI assistant (the spark) keeping email, calendar, documents, and
 *  customer chat organised around it. */
function AiForSmes() {
  return (
    <svg viewBox="0 0 480 270" fill="none" aria-hidden="true">
      {/* connectors */}
      <g stroke={C.dimStroke} strokeWidth="2">
        <path d="M124 64 Q168 74 198 106" />
        <path d="M356 64 Q312 74 282 106" />
        <path d="M124 206 Q168 196 198 164" />
        <path d="M356 206 Q312 196 282 164" />
      </g>
      <circle cx="162" cy="80" r="3" fill={C.teal} />
      <circle cx="318" cy="80" r="3" fill={C.teal} />
      <circle cx="162" cy="190" r="3" fill={C.teal} />
      <circle cx="318" cy="190" r="3" fill={C.teal} />
      {/* satellites: email / calendar / documents / chat */}
      <g stroke={C.line} strokeWidth="2">
        <rect x="64" y="40" width="60" height="48" rx="11" fill={C.dimFill} />
        <rect x="356" y="40" width="60" height="48" rx="11" fill={C.dimFill} />
        <rect x="64" y="182" width="60" height="48" rx="11" fill={C.dimFill} />
        <rect x="356" y="182" width="60" height="48" rx="11" fill={C.dimFill} />
        <rect x="78" y="54" width="32" height="21" rx="4" />
        <path d="M78 57 l16 12 16 -12" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="370" y="55" width="32" height="24" rx="4" />
        <path d="M370 63 h32 M378 49 v8 M394 49 v8" strokeLinecap="round" />
      </g>
      <circle cx="378" cy="70" r="1.8" fill={C.line} />
      <circle cx="386" cy="70" r="1.8" fill={C.line} />
      <circle cx="394" cy="70" r="1.8" fill={C.line} />
      <g stroke={C.line} strokeWidth="2.5" strokeLinecap="round" opacity=".65">
        <path d="M80 198 h28 M80 208 h19 M80 218 h28" />
      </g>
      <rect x="370" y="194" width="32" height="19" rx="8" stroke={C.line} strokeWidth="2" />
      <path d="M378 213 l-5 9 11 -5 z" fill={C.dimFill} stroke={C.line} strokeWidth="2" />
      {/* focal: the assistant */}
      <rect x="186" y="81" width="108" height="108" rx="26" stroke={C.tealGlow} strokeWidth="2" />
      <rect x="194" y="89" width="92" height="92" rx="22" fill={C.tealDim} stroke={C.teal} strokeWidth="2.5" />
      <path d="M240 109 L247 128 L266 135 L247 142 L240 161 L233 142 L214 135 L233 128 Z" fill={C.teal} />
    </svg>
  );
}

/** Many candidate tasks funnelled down to the one worth starting with,
 *  pointed at a clear target. */
function WhereToStartWithAi() {
  return (
    <svg viewBox="0 0 480 270" fill="none" aria-hidden="true">
      {/* the unsorted pile */}
      <g stroke={C.line} strokeWidth="2" fill={C.dimFill}>
        <circle cx="52" cy="72" r="7" />
        <circle cx="98" cy="52" r="6" />
        <circle cx="140" cy="84" r="7" />
        <circle cx="54" cy="128" r="6" />
        <circle cx="104" cy="120" r="7" />
        <circle cx="60" cy="186" r="7" />
        <circle cx="112" cy="168" r="6" />
        <rect x="84" y="196" width="14" height="14" rx="4" />
        <rect x="136" y="182" width="13" height="13" rx="4" />
        <rect x="140" y="128" width="13" height="13" rx="4" />
      </g>
      {/* the funnel */}
      <path d="M170 54 L296 116" stroke={C.dimStroke} strokeWidth="2" />
      <path d="M170 216 L296 154" stroke={C.dimStroke} strokeWidth="2" />
      <circle cx="206" cy="120" r="6" stroke={C.line} strokeWidth="2" fill={C.dimFill} />
      <circle cx="246" cy="128" r="5" stroke={C.line} strokeWidth="2" fill={C.dimFill} />
      <circle cx="274" cy="133" r="4" stroke={C.teal} strokeWidth="2" fill={C.tealDim} />
      {/* focal: the one chosen workflow */}
      <circle cx="330" cy="135" r="26" stroke={C.tealGlow} strokeWidth="2" />
      <circle cx="330" cy="135" r="17" fill={C.tealDim} stroke={C.teal} strokeWidth="2.5" />
      <path d="M330 124 L333 132 L341 135 L333 138 L330 146 L327 138 L319 135 L327 132 Z" fill={C.teal} />
      {/* to the target */}
      <path d="M356 135 H404" stroke={C.teal} strokeWidth="2.5" />
      <polygon points="404,128 416,135 404,142" fill={C.teal} />
      <circle cx="440" cy="135" r="12" stroke={C.line} strokeWidth="2" />
      <circle cx="440" cy="135" r="4" fill={C.teal} />
    </svg>
  );
}

/** One source piece (the system) fanning out into video, article, and email
 *  formats — while the calendar grid fades into the background. */
function ContentSystemNotCalendar() {
  return (
    <svg viewBox="0 0 480 270" fill="none" aria-hidden="true">
      {/* the calendar, receding */}
      <g opacity=".8">
        <rect x="40" y="56" width="108" height="100" rx="13" stroke={C.dimStroke} strokeWidth="2" fill={C.dimFill} />
        <path d="M40 80 h108" stroke={C.dimStroke} strokeWidth="2" />
        <path d="M64 48 v12 M124 48 v12" stroke={C.dimStroke} strokeWidth="2" strokeLinecap="round" />
        <g fill={C.faint}>
          <circle cx="60" cy="96" r="2.5" /><circle cx="80" cy="96" r="2.5" /><circle cx="100" cy="96" r="2.5" />
          <circle cx="60" cy="114" r="2.5" /><circle cx="80" cy="114" r="2.5" /><circle cx="100" cy="114" r="2.5" />
          <circle cx="60" cy="132" r="2.5" /><circle cx="80" cy="132" r="2.5" />
        </g>
      </g>
      {/* focal: the one source piece */}
      <rect x="110" y="82" width="92" height="112" rx="16" stroke={C.tealGlow} strokeWidth="2" />
      <rect x="116" y="88" width="80" height="100" rx="13" fill="#101c30" stroke={C.teal} strokeWidth="2.5" />
      <g stroke={C.soft} strokeWidth="2.5" strokeLinecap="round" opacity=".85">
        <path d="M132 112 h48 M132 128 h34 M132 144 h48" />
      </g>
      <rect x="132" y="160" width="28" height="6" rx="3" fill={C.teal} />
      {/* the fan-out */}
      <g stroke={C.dimStroke} strokeWidth="2">
        <path d="M196 118 Q252 84 296 67" />
        <path d="M196 138 H296" />
        <path d="M196 158 Q252 192 296 209" />
      </g>
      <circle cx="298" cy="66" r="3" fill={C.teal} />
      <circle cx="298" cy="138" r="3" fill={C.teal} />
      <circle cx="298" cy="210" r="3" fill={C.teal} />
      {/* outputs: video / article / email */}
      <g stroke={C.line} strokeWidth="2">
        <rect x="302" y="44" width="72" height="48" rx="11" fill={C.dimFill} />
        <rect x="302" y="114" width="72" height="48" rx="11" fill={C.dimFill} />
        <rect x="302" y="184" width="72" height="48" rx="11" fill={C.dimFill} />
        <polygon points="328,56 328,80 348,68" strokeLinejoin="round" />
        <rect x="318" y="198" width="32" height="21" rx="4" />
        <path d="M318 201 l16 12 16 -12" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g stroke={C.line} strokeWidth="2.5" strokeLinecap="round" opacity=".65">
        <path d="M318 132 h40 M318 144 h26" />
      </g>
    </svg>
  );
}

/** This site being assembled: a browser with placed sections, a dashed slot,
 *  and the next block moving into position. */
function HowWeBuiltThisSite() {
  return (
    <svg viewBox="0 0 480 270" fill="none" aria-hidden="true">
      {/* browser */}
      <rect x="160" y="44" width="280" height="148" rx="14" fill={C.dimFill} stroke={C.line} strokeWidth="2" />
      <path d="M160 78 h280" stroke={C.dimStroke} strokeWidth="2" />
      <g fill={C.line} opacity=".7">
        <circle cx="178" cy="61" r="4" /><circle cx="194" cy="61" r="4" /><circle cx="210" cy="61" r="4" />
      </g>
      <rect x="226" y="53" width="140" height="16" rx="8" stroke={C.dimStroke} strokeWidth="2" />
      {/* placed section + waiting slot */}
      <rect x="176" y="92" width="248" height="26" rx="7" fill="rgba(255,255,255,.04)" stroke={C.dimStroke} strokeWidth="2" />
      <path d="M190 105 h60" stroke={C.line} strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
      <rect x="176" y="130" width="248" height="42" rx="8" stroke={C.teal} strokeWidth="2" strokeDasharray="5 6" opacity=".75" />
      {/* focal: the next block, moving in */}
      <rect x="196" y="206" width="132" height="50" rx="13" stroke={C.tealGlow} strokeWidth="2" />
      <rect x="202" y="212" width="120" height="38" rx="10" fill={C.tealDim} stroke={C.teal} strokeWidth="2.5" />
      <g stroke={C.soft} strokeWidth="2.5" strokeLinecap="round" opacity=".85">
        <path d="M218 226 h58 M218 238 h36" />
      </g>
      <path d="M262 204 V180" stroke={C.teal} strokeWidth="2" strokeDasharray="4 5" />
      <polygon points="255,182 262,170 269,182" fill={C.teal} />
    </svg>
  );
}

/** What the website is for: a clear action. A page whose whole hierarchy
 *  points at one button, a visitor clicking it, and the enquiry arriving. */
function WhatABusinessWebsiteIsFor() {
  return (
    <svg viewBox="0 0 480 270" fill="none" aria-hidden="true">
      {/* browser */}
      <rect x="118" y="46" width="228" height="178" rx="14" fill={C.dimFill} stroke={C.line} strokeWidth="2" />
      <path d="M118 80 h228" stroke={C.dimStroke} strokeWidth="2" />
      <g fill={C.line} opacity=".7">
        <circle cx="136" cy="63" r="4" /><circle cx="152" cy="63" r="4" /><circle cx="168" cy="63" r="4" />
      </g>
      <rect x="184" y="55" width="116" height="16" rx="8" stroke={C.dimStroke} strokeWidth="2" />
      <g stroke={C.line} strokeWidth="2.5" strokeLinecap="round" opacity=".65">
        <path d="M138 104 h96 M138 118 h64" />
      </g>
      {/* focal: the call to action */}
      <rect x="132" y="140" width="118" height="44" rx="22" stroke={C.tealGlow} strokeWidth="2" />
      <rect x="138" y="146" width="106" height="32" rx="16" fill={C.teal} />
      <rect x="158" y="159" width="66" height="6" rx="3" fill="rgba(8,37,31,.55)" />
      {/* the visitor */}
      <path d="M238 172 v26 l6.5 -6 4.5 10 6 -2.8 -4.5 -10 8.5 -1 z" fill={C.soft} stroke="#0b1020" strokeWidth="1.5" strokeLinejoin="round" />
      {/* the enquiry arriving */}
      <path d="M346 141 H364" stroke={C.dimStroke} strokeWidth="2" />
      <circle cx="366" cy="141" r="3" fill={C.teal} />
      <rect x="372" y="112" width="80" height="58" rx="12" fill={C.dimFill} stroke={C.line} strokeWidth="2" />
      <rect x="386" y="128" width="30" height="20" rx="4" stroke={C.line} strokeWidth="2" />
      <path d="M386 131 l15 11 15 -11" stroke={C.line} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="432" cy="138" r="9" stroke={C.teal} strokeWidth="2" />
      <path d="M428 138 l3 3.5 6 -7" stroke={C.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// slug → scene. Filename in content/blog/ is the slug.
const ART: Record<string, () => JSX.Element> = {
  "whatsapp-is-your-front-desk": WhatsAppFrontDesk,
  "automation-before-tools": AutomationBeforeTools,
  "ai-for-smes": AiForSmes,
  "where-to-start-with-ai": WhereToStartWithAi,
  "content-system-not-calendar": ContentSystemNotCalendar,
  "how-we-built-this-site": HowWeBuiltThisSite,
  "what-a-business-website-is-for": WhatABusinessWebsiteIsFor
};

export function hasCoverArt(slug: string): boolean {
  return slug in ART;
}

export function CoverArt({ slug }: { slug: string }) {
  const Art = ART[slug];
  return Art ? <Art /> : null;
}
