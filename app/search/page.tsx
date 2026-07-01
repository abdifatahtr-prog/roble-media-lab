"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { articles, services } from "@/content/site";

const index=[...services.map(s=>({title:s.title,description:s.short,href:`/services/${s.slug}`,type:"Service"})),...articles.map(a=>({title:a.title,description:a.description,href:`/blog/${a.slug}`,type:"Insight"}))];
export default function SearchPage(){const [query,setQuery]=useState("");const results=useMemo(()=>{const q=query.trim().toLowerCase();return q?index.filter(item=>`${item.title} ${item.description} ${item.type}`.toLowerCase().includes(q)):[]},[query]);return <><PageHero eyebrow="Search" title="Find what you need."><p>Search our services and practical insights.</p></PageHero><section className="content-section"><div className="shell narrow"><label htmlFor="site-search" style={{display:"block",fontWeight:700,marginBottom:10}}>Search the website</label><input id="site-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try “automation” or “content”" style={{width:"100%",minHeight:58,border:"1px solid var(--line)",borderRadius:14,padding:"0 18px",background:"white",fontSize:17}}/><div style={{display:"grid",gap:14,marginTop:28}}>{query&&!results.length&&<p>No matching pages found.</p>}{results.map(item=><Link className="plain-card" href={item.href} key={item.href}><span className="eyebrow">{item.type}</span><h2>{item.title}</h2><p>{item.description}</p></Link>)}</div></div></section></>}
