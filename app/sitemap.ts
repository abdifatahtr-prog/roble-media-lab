import type { MetadataRoute } from "next";
import { services, site } from "@/content/site";
import { getAllPosts } from "@/lib/blog";
export default function sitemap():MetadataRoute.Sitemap{const routes=["","/about","/services","/blog","/resources","/case-studies","/faq","/contact","/book","/privacy","/terms"];return [...routes.map(route=>({url:`${site.url}${route}`,lastModified:new Date(),changeFrequency:route===""?"weekly" as const:"monthly" as const,priority:route===""?1:.7})),...services.map(s=>({url:`${site.url}/services/${s.slug}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:.8})),...getAllPosts().map(a=>({url:`${site.url}/blog/${a.slug}`,lastModified:new Date(a.date),changeFrequency:"monthly" as const,priority:.6}))]}
