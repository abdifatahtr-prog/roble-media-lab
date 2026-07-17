import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { CTA } from "@/components/cta";
import { CheckIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { services, site } from "@/content/site";
import { getAllPosts } from "@/lib/blog";

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const { slug } = await params; const service = services.find((item)=>item.slug===slug);
  return service ? { title: service.title, description: service.intro, alternates: { canonical: `/services/${slug}` } } : {};
}

export default async function ServicePage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params; const service = services.find((item)=>item.slug===slug); if(!service) notFound();
  // Posts whose pillar this service owns, newest first. Keeps every service page
  // linked to the articles that support it without hand-maintaining a list.
  const relatedPosts = getAllPosts().filter((post)=>service.pillars.includes(post.pillar)).slice(0,3);
  const schema={"@context":"https://schema.org","@type":"Service",name:service.title,description:service.intro,serviceType:service.title,provider:{"@type":"Organization",name:site.name,url:site.url},areaServed:["Kenya","East Africa"],url:`${site.url}/services/${service.slug}`};
  return <><PageHero eyebrow="Roble Media Lab service" title={service.title}><p>{service.intro}</p></PageHero>
    <section className="content-section"><div className="shell"><div className="split-heading section-heading"><div><span className="eyebrow">What this creates</span><h2>A useful outcome, not another unused tool.</h2></div><p>Scope depends on your workflow and needs. We define the work clearly before implementation begins.</p></div><div className="plain-grid">{service.outcomes.map((outcome)=><div className="plain-card" key={outcome}><CheckIcon style={{width:24,color:"var(--teal-dark)"}}/><h3>{outcome}</h3></div>)}</div></div></section>
    <section className="content-section soft-section"><div className="shell process-layout"><div className="process-intro"><span className="eyebrow">Approach</span><h2>How the work moves forward.</h2></div><div className="process-list">{service.process.map((step,index)=><div className="process-step" key={step}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{step}</h3></div></div>)}</div></div></section>
    {relatedPosts.length>0 && <section className="content-section"><div className="shell"><div className="split-heading section-heading"><div><span className="eyebrow">Related reading</span><h2>How we think about this work.</h2></div><p>Written before the pitch. Read these and judge the approach for yourself.</p></div><div className="plain-grid">{relatedPosts.map((post)=><ArticleCard key={post.slug} post={post}/>)}</div></div></section>}
    {/* Pass the service so the WhatsApp chat opens already on-topic. */}
    <CTA service={service.title}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>;
}
