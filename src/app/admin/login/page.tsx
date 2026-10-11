"use client";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin(){
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);const router=useRouter();
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setMessage("");const supabase=createClient();const {error}=await supabase.auth.signInWithPassword({email,password});if(error){setBusy(false);setMessage("Unable to sign in. Check credentials or contact the site owner.");return}const {data:{user}}=await supabase.auth.getUser();const response=await fetch("/api/admin/check",{method:"POST"});setBusy(false);if(!response.ok){await supabase.auth.signOut();setMessage("This account is not authorized for administration.");return}router.push("/admin");router.refresh();}
 return <><SiteNav/><main className="auth-wrap"><form className="auth-card" onSubmit={submit}><span className="eyebrow"><i/> RESTRICTED AREA</span><h1 style={{marginTop:18}}>Admin sign in</h1><p className="muted">Separate access for authorized shop administrators.</p><div className="field"><label htmlFor="email">Admin email</label><input id="email" type="email" required autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)}/></div><div className="field"><label htmlFor="password">Password</label><input id="password" type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}/></div><button className="btn btn-primary" disabled={busy} style={{width:"100%"}}>{busy?"Verifying…":"Enter dashboard"}</button>{message&&<p className="form-error">{message}</p>}<p className="muted">Admin allowlisting is configured on the server with <code>ADMIN_EMAILS</code>. Enable MFA in Supabase before production.</p></form></main></>;
}
