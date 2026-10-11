"use client";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import { createClient } from "@/lib/supabase/client";

export default function ResetPage(){
 const [password,setPassword]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);const router=useRouter();
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);const supabase=createClient();const {error}=await supabase.auth.updateUser({password});setBusy(false);if(error){setMessage("Reset session expired. Request a new password reset email.");return}setMessage("Password updated. Redirecting to sign in…");setTimeout(()=>router.push("/login"),1200);}
 return <><SiteNav/><main className="auth-wrap"><form className="auth-card" onSubmit={submit}><h1>Choose a new password</h1><p className="muted">Use at least 12 characters and avoid reusing a password.</p><div className="field"><label htmlFor="password">New password</label><input id="password" type="password" minLength={12} required value={password} onChange={e=>setPassword(e.target.value)}/></div><button className="btn btn-primary" disabled={busy} style={{width:"100%"}}>{busy?"Updating…":"Update password"}</button>{message&&<p className="muted">{message}</p>}</form></main></>;
}
