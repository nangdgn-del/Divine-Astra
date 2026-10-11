"use client";
import { useState } from "react";
import { ArrowUpRight, ScanSearch, ShieldCheck, Gauge, Fingerprint, KeyRound, MonitorCog, X } from "lucide-react";
import type { Product } from "@/lib/catalog";

const icons = [ScanSearch, ShieldCheck, Gauge, Fingerprint, KeyRound, MonitorCog];

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const [preview, setPreview] = useState(false);
  const Icon = icons[index % icons.length];
  return <>
    <article className="product reveal" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="product-art"><Icon /></div>
      <div className="product-top"><span className="tag">{product.category}</span><span className="price">{product.status === "Available" ? `$${product.price}` : "Soon"}</span></div>
      <h3>{product.name}</h3><p>{product.description}</p>
      <button className="btn" onClick={() => setPreview(true)}>Preview details <ArrowUpRight size={15}/></button>
    </article>
    {preview && <div role="presentation" onClick={() => setPreview(false)} style={{position:"fixed",inset:0,zIndex:50,background:"#03040bd9",display:"grid",placeItems:"center",padding:18}}>
      <section role="dialog" aria-modal="true" aria-label={`${product.name} preview`} onClick={e => e.stopPropagation()} className="auth-card" style={{position:"relative"}}>
        <button aria-label="Close preview" className="btn" onClick={() => setPreview(false)} style={{position:"absolute",right:16,top:16,padding:8}}><X size={16}/></button>
        <div className="product-art"><Icon /></div><span className="tag">{product.category}</span>
        <h2 style={{fontFamily:"Space Grotesk",marginBottom:8}}>{product.name}</h2><p className="muted">{product.description}</p>
        <ul className="muted" style={{paddingLeft:20,lineHeight:2}}>{product.features.map(f => <li key={f}>{f}</li>)}</ul>
        <p className="muted">Preview media: add your image or video in <code>public/products/</code> and update this card.</p>
        {product.status === "Available" ? <a className="btn btn-primary" href="/signup">Create account to order · ${product.price}</a> : <span className="tag">Coming soon</span>}
      </section>
    </div>}
  </>;
}
