import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, ShoppingBag, ShieldAlert, Activity, Settings, LogOut } from "lucide-react";
import { getSignedInUser, isAdminEmail } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import SignOutButton from "@/components/SignOutButton";
import SiteNav from "@/components/SiteNav";

export const dynamic = "force-dynamic";

export default async function AdminDashboard(){
 const {user}=await getSignedInUser(); if(!user) redirect("/admin/login"); if(!isAdminEmail(user.email)) redirect("/admin/login");
 const admin=createAdminClient();
 const [profiles,orders,events]=await Promise.all([
   admin.from("profiles").select("id,display_name,email,created_at,is_banned").order("created_at",{ascending:false}).limit(100),
   admin.from("orders").select("id,status,total,created_at,product_name,customer_email").order("created_at",{ascending:false}).limit(100),
   admin.from("security_events").select("id,event_type,detail,created_at").order("created_at",{ascending:false}).limit(10)
 ]);
 const customers=profiles.data||[];const purchases=orders.data||[];const revenue=purchases.filter(o=>o.status==="paid").reduce((s,o)=>s+Number(o.total||0),0);
 return <><SiteNav/><main className="shell">
 <div className="dashboard"><aside className="sidebar"><div className="brand" style={{fontSize:17,marginBottom:20}}><span className="brandmark"><Activity size={18}/></span> Astra Admin</div><a className="side-link active" href="/admin"><Activity size={15} style={{display:"inline",marginRight:8}}/>Analytics</a><a className="side-link" href="#customers"><Users size={15} style={{display:"inline",marginRight:8}}/>Customers</a><a className="side-link" href="#orders"><ShoppingBag size={15} style={{display:"inline",marginRight:8}}/>Orders</a><a className="side-link" href="#events"><ShieldAlert size={15} style={{display:"inline",marginRight:8}}/>Security events</a><div style={{marginTop:25}}><SignOutButton/></div></aside>
 <section><span className="eyebrow"><i/> CONTROL CENTER</span><h1 style={{fontFamily:"Space Grotesk",fontSize:34,margin:"16px 0 7px"}}>Analytics overview</h1><p className="sub">Signed in as {user.email}. This view shows the latest stored records.</p>
 <div className="stats" style={{marginTop:25}}><div className="stat"><span>Total customers</span><strong>{customers.length}</strong></div><div className="stat"><span>Orders recorded</span><strong>{purchases.length}</strong></div><div className="stat"><span>Paid order total</span><strong>${revenue.toFixed(2)}</strong></div></div>
 <div id="customers" className="dash-card" style={{marginTop:22}}><h3>Customer information</h3><p className="muted">Passwords and authentication secrets are never exposed here. Email/name edits should be handled through verified account workflows.</p><div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Registered</th><th>Status</th></tr></thead><tbody>{customers.map((c:any)=><tr key={c.id}><td>{c.display_name||"—"}</td><td>{c.email||"—"}</td><td>{new Date(c.created_at).toLocaleString()}</td><td><span className="status">{c.is_banned?"Banned":"Active"}</span></td></tr>)}{!customers.length&&<tr><td colSpan={4}>No customer profiles found yet. Apply the SQL schema and enable the profile trigger.</td></tr>}</tbody></table></div></div>
 <div id="orders" className="dash-card" style={{marginTop:18}}><h3>Recent orders</h3><div className="table-wrap"><table><thead><tr><th>Product</th><th>Customer</th><th>Total</th><th>Status</th><th>Created</th></tr></thead><tbody>{purchases.map((o:any)=><tr key={o.id}><td>{o.product_name}</td><td>{o.customer_email}</td><td>${Number(o.total).toFixed(2)}</td><td>{o.status}</td><td>{new Date(o.created_at).toLocaleDateString()}</td></tr>)}{!purchases.length&&<tr><td colSpan={5}>No orders recorded.</td></tr>}</tbody></table></div></div>
 <div id="events" className="dash-card" style={{marginTop:18}}><h3>Recent security events</h3><div className="table-wrap"><table><thead><tr><th>Event</th><th>Details</th><th>Time</th></tr></thead><tbody>{(events.data||[]).map((ev:any)=><tr key={ev.id}><td>{ev.event_type}</td><td>{ev.detail}</td><td>{new Date(ev.created_at).toLocaleString()}</td></tr>)}{!events.data?.length&&<tr><td colSpan={3}>No events logged.</td></tr>}</tbody></table></div></div>
 <p className="muted" style={{marginTop:16}}>Online-user counts require a heartbeat/presence table and are not inferred from total registered customers.</p>
 </section></div></main></>;
}
