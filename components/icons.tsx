import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowUpRight(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function ArrowRight(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function MenuIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}

export function CloseIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}

export function SearchIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}

export function CheckIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

// Social brand glyphs. Solid fills (currentColor) so they read at small sizes.
export function LinkedInIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3zM9 9h3.8v1.65h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V21H9z"/></svg>;
}

export function InstagramIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor"/></svg>;
}

export function XIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M17.9 3h3.3l-7.2 8.24L22.5 21h-6.6l-5.17-6.76L4.8 21H1.5l7.7-8.8L1.6 3h6.77l4.67 6.18Zm-1.16 16h1.83L7.34 4.9H5.38Z"/></svg>;
}

export function FacebookIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>;
}

export function YouTubeIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M23 12s0-3.13-.4-4.63a2.85 2.85 0 0 0-2-2C18.9 5 12 5 12 5s-6.9 0-8.6.37a2.85 2.85 0 0 0-2 2C1 8.87 1 12 1 12s0 3.13.4 4.63a2.85 2.85 0 0 0 2 2C5.1 19 12 19 12 19s6.9 0 8.6-.37a2.85 2.85 0 0 0 2-2C23 15.13 23 12 23 12ZM9.8 15.2V8.8l5.5 3.2Z"/></svg>;
}

export function TikTokIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M16.5 3c.35 2.2 1.6 3.7 3.9 3.9v2.55c-1.35.13-2.53-.3-3.9-1.1v5.9c0 4.6-5 6.03-7 2.73-1.3-2.14-.5-5.6 3.7-5.75v2.68c-.32.05-.66.13-.97.24-.94.32-1.47 1.06-1.32 2.1.28 2 3.94 2.58 3.63-1.32V3Z"/></svg>;
}

export function WhatsAppIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.5 9.5 0 01-4.84-1.32l-.35-.2-3.6.94.96-3.5-.23-.36a9.45 9.45 0 01-1.45-5.05c0-5.24 4.27-9.5 9.52-9.5 2.54 0 4.93.99 6.73 2.79a9.44 9.44 0 012.79 6.72c-.01 5.24-4.28 9.5-9.52 9.5zM20.5 3.5A11.4 11.4 0 0012.05 0C5.75 0 .62 5.13.62 11.43c0 2.01.53 3.98 1.53 5.71L.5 24l6.98-1.83a11.4 11.4 0 005.56 1.42h.01c6.3 0 11.43-5.13 11.43-11.43 0-3.05-1.19-5.92-3.35-8.08z"/></svg>;
}
