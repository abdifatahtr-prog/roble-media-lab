import { clients, testimonials } from "@/content/site";

// Renders nothing until real, permission-cleared content exists in content/site.ts.
// This keeps the "honest by default" brand promise: no fabricated proof ever ships.
export function Testimonials() {
  if (!testimonials.length && !clients.length) return null;
  return (
    <section className="section soft-section" id="proof">
      <div className="shell">
        <div className="section-heading">
          <span className="eyebrow">Proof, not promises</span>
          <h2>What working with us is like.</h2>
        </div>

        {testimonials.length > 0 && (
          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <figure className="testimonial-card" key={t.name}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <b>{t.name}</b>
                  <span>{t.company ? `${t.role}, ${t.company}` : t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {clients.length > 0 && (
          <div className="client-strip">
            <span>Trusted by</span>
            {clients.map((c) => (
              <b key={c.name}>{c.name}</b>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
