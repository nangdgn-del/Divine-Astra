import Link from "next/link";
import { ArrowRight, CheckCircle2, Orbit, ShieldCheck, Sparkles } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/catalog";

export default function HomePage() {
  return <>
    <SiteNav/>
    <main className="shell">
      <section className="hero">
        <div className="reveal">
          <span className="eyebrow"><i/> THE DIVINE ASTRA COLLECTION</span>
          <h1>Tools for the<br/><span className="gradient">curious & capable.</span></h1>
          <p>A considered collection of web security and performance utilities. Clear interfaces, transparent scope, and tools designed for systems you own or are authorized to test.</p>
          <div className="hero-actions"><a className="btn btn-primary" href="#products">Explore products <ArrowRight size={16}/></a><Link className="btn" href="/signup">Join Divine Astra</Link></div>
          <div className="hero-note">SECURITY-FIRST · CLEAN BY DESIGN · BUILT FOR RESPONSIBLE TESTING</div>
        </div>
        <div className="visual reveal"><div className="orb"/><div className="visual-bottom">
          <div className="mini"><small><ShieldCheck size={13} style={{display:"inline",verticalAlign:"middle"}}/> Protection status</small><strong>Security minded</strong></div>
          <div className="mini"><small><Sparkles size={13} style={{display:"inline",verticalAlign:"middle"}}/> Product suite</small><strong>Curated utilities</strong></div>
        </div></div>
      </section>
      <section className="section" id="products">
        <div className="section-head"><div><span className="eyebrow"><i/> THE CATALOG</span><h2 style={{marginTop:14}}>Find your next tool.</h2><p className="sub">Preview each product before creating an account.</p></div><span className="muted">{products.filter(p=>p.status==="Available").length} available · {products.filter(p=>p.status==="Coming soon").length} upcoming</span></div>
        <div className="product-grid">{products.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div>
      </section>
      <section className="section" id="notice"><div className="notice">
        <div><span className="eyebrow"><i/> PLEASE READ</span><h3 style={{marginTop:16}}>A few things to remember.</h3>
          <ul><li>We sell digital products and authorized security utilities.</li><li>Use testing tools only on systems you own or have permission to assess.</li><li>Check product details and compatibility before ordering.</li><li>Digital orders are handled after payment is confirmed; refund terms must follow applicable law.</li><li>We protect account data and never display customer passwords to staff.</li><li>Support may be delayed during busy periods. Please avoid spam and do not share private account information publicly.</li></ul>
        </div>
        <div><h3>Shopkeeper contacts</h3><p className="sub">Reach out through the official support channels for product and order questions.</p>
          <div className="contact-list" style={{marginTop:16}}><a className="contact" href="https://t.me/qxnymous666" target="_blank" rel="noreferrer">@qxnymous666</a><a className="contact" href="https://t.me/n08_anonymous" target="_blank" rel="noreferrer">@n08_anonymous</a><a className="contact" href="https://t.me/Qxcyber666" target="_blank" rel="noreferrer">Qxcyber666 channel</a><a className="contact" href="https://t.me/Empire01Sec" target="_blank" rel="noreferrer">Empire01Sec channel</a></div>
          <div style={{marginTop:24,padding:18,borderRadius:14,background:"#080a14",border:"1px solid var(--line)"}}><div style={{display:"flex",gap:10,alignItems:"center"}}><CheckCircle2 color="#b7a2ff"/><strong>Privacy comes first</strong></div><p className="muted">Passwords are hashed by the auth provider. Admins can manage orders and account status, but cannot view plaintext passwords or secret authentication codes.</p></div>
        </div>
      </div></section>
    </main>
    <footer className="shell footer"><span>© {new Date().getFullYear()} Divine Astra</span><span>Built for clarity. Designed for control.</span><span><Orbit size={14} style={{display:"inline",verticalAlign:"middle"}}/> Divine Astra</span></footer>
  </>;
}
