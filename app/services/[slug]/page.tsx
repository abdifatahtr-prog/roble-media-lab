import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/cta";
import { CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { services, site } from "@/content/site";

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const { slug } = await params; const service = services.find((item)=>item.slug===slug);
  return service ? { title: service.title, description: service.intro, alternates: { canonical: `/services/${slug}` } } : {};
}

export default async function ServicePage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params; const service = services.find((item)=>item.slug===slug); if(!service) notFound();
  const schema={"@context":"https://schema.org","@type":"Service",name:service.title,description:service.intro,provider:{"@type":"Organization",name:site.name,url:site.url},areaServed:["Kenya","East Africa"]};
  return <><PageHero eyebrow="Roble Media Lab service" title={service.title}><p>{service.intro}</p></PageHero>
    <section className="content-section"><div className="shell"><div className="split-heading section-heading"><div><span className="eyebrow">What this creates</span><h2>A useful outcome, not another unused tool.</h2></div><p>Scope depends on your workflow and needs. We define the work clearly before implementation begins.</p></div><div className="plain-grid">{service.outcomes.map((outcome)=><div className="plain-card" key={outcome}><CheckIcon style={{width:24,color:"var(--teal-dark)"}}/><h3>{outcome}</h3></div>)}</div></div></section>
    <section className="content-section soft-section"><div className="shell process-layout"><div className="process-intro"><span className="eyebrow">Approach</span><h2>How the work moves forward.</h2></div><div className="process-list">{service.process.map((step,index)=><div className="process-step" key={step}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{step}</h3></div></div>)}</div></div></section><CTA/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>;
}
