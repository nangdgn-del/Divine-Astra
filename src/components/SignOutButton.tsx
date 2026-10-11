"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function SignOutButton(){const router=useRouter();return <button className="btn" onClick={async()=>{const supabase=createClient();await supabase.auth.signOut();router.push("/");router.refresh();}}>Sign out</button>}
