import Link from "next/link";
import { ArrowRight } from "@/components/icons";
export default function NotFound(){return <section className="page-hero" style={{minHeight:"75vh",display:"grid",alignItems:"center"}}><div className="shell narrow"><span className="eyebrow">404 · Page not found</span><h1>This path went somewhere else.</h1><div className="page-lead"><p>The page may have moved or the address may be incomplete.</p><Link className="text-link" href="/">Return home <ArrowRight/></Link></div></div></section>}
