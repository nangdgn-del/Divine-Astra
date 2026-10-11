import Link from "next/link";
import { redirect } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import { getSignedInUser } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function AccountPage(){
 const {user}=await getSignedInUser(); if(!user) redirect("/login");
 return <><SiteNav/><main className="shell section"><span className="eyebrow"><i/> CUSTOMER SPACE</span><h1 style={{fontFamily:"Space Grotesk",fontSize:38}}>Welcome, {user.user_metadata?.display_name||"customer"}.</h1><p className="sub">Signed in as {user.email}. Your purchases will appear here once an order is confirmed by the shopkeeper.</p><div className="dash-card" style={{marginTop:24,maxWidth:700}}><h3>Order history</h3><p className="muted">No orders yet. Explore the catalog and contact the shopkeepers to arrange a purchase.</p><Link className="btn btn-primary" href="/#products">Browse products</Link></div><div style={{marginTop:20}}><SignOutButton/></div></main></>;
}
