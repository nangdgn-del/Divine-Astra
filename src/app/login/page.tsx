"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage(){
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);const router=useRouter();
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setMessage("");const supabase=createClient();const {error}=await supabase.auth.signInWithPassword({email,password});setBusy(false);if(error){setMessage("Sign-in failed. Check your details or reset your password.");return}router.push("/account");router.refresh();}
 return <><SiteNav/><main className="auth-wrap"><form className="auth-card" onSubmit={submit}><span className="eyebrow"><i/> WELCOME BACK</span><h1 style={{marginTop:18}}>Sign in</h1><p className="muted">Access your account and order history.</p>
 <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div>
 <div className="field"><label htmlFor="password">Password</label><input id="password" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/></div>
 <div style={{textAlign:"right",fontSize:12}}><Link href="/forgot" style={{color:"#c9bbff"}}>Forgot password?</Link></div>
 <button disabled={busy} className="btn btn-primary" style={{width:"100%",marginTop:18}}>{busy?"Signing in…":"Sign in"}</button>{message&&<p className="form-error">{message}</p>}
 <p className="muted" style={{marginTop:18}}>New here? <Link href="/signup" style={{color:"#c9bbff"}}>Create an account</Link></p></form></main></>;
}
