"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import SiteNav from "@/components/SiteNav";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [message,setMessage]=useState(""); const [error,setError]=useState(false); const [busy,setBusy]=useState(false);
  async function submit(e:FormEvent){e.preventDefault();setBusy(true);setMessage("");setError(false);
    const supabase=createClient();
    const {error}=await supabase.auth.signUp({email,password,options:{data:{display_name:name},emailRedirectTo:`${location.origin}/auth/callback`}});
    setBusy(false); if(error){setError(true);setMessage(error.message);return}
    setMessage("Account request created. Check your email to verify your address before signing in.");
  }
  return <><SiteNav/><main className="auth-wrap"><form className="auth-card" onSubmit={submit}><span className="eyebrow"><i/> YOUR ASTRA ACCOUNT</span><h1 style={{marginTop:18}}>Create account</h1><p className="muted">Join the collection and keep your orders in one place.</p>
    <div className="field"><label htmlFor="name">Display name</label><input id="name" autoComplete="name" required maxLength={60} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></div>
    <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></div>
    <div className="field"><label htmlFor="password">Password (12+ characters)</label><input id="password" type="password" autoComplete="new-password" minLength={12} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Use a long unique password"/></div>
    <button disabled={busy} className="btn btn-primary" style={{width:"100%",marginTop:8}}>{busy?"Creating account…":"Create account"}</button>
    {message&&<p className={error?"form-error":"form-success"}>{message}</p>}<p className="muted" style={{marginTop:18}}>Already registered? <Link href="/login" style={{color:"#c9bbff"}}>Sign in</Link></p>
  </form></main></>;
}
