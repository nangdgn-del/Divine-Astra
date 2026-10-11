"use client";
import { FormEvent,useState } from "react";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPage(){
 const [email,setEmail]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);const supabase=createClient();await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${location.origin}/reset`});setBusy(false);setMessage("If an account exists for that address, a reset link will arrive by email. Please wait before requesting another.");}
 return <><SiteNav/><main className="auth-wrap"><form className="auth-card" onSubmit={submit}><h1>Reset your password</h1><p className="muted">We'll email a one-time reset link if the account exists.</p><div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div><button className="btn btn-primary" disabled={busy} style={{width:"100%"}}>{busy?"Sending…":"Send reset link"}</button>{message&&<p className="form-success">{message}</p>}<p className="muted"><Link href="/login">Back to sign in</Link></p></form></main></>;
}
