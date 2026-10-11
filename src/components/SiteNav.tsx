import Link from "next/link";
import { Orbit } from "lucide-react";

export default function SiteNav() {
  return <header className="shell"><nav className="nav">
    <Link href="/" className="brand"><span className="brandmark"><Orbit size={21}/></span>Divine Astra</Link>
    <div className="navlinks">
      <a className="hide-mobile" href="/#products">Products</a>
      <a className="hide-mobile" href="/#notice">Notice</a>
      <Link className="hide-mobile" href="/login">Sign in</Link>
      <Link className="btn btn-primary" href="/signup">Create account</Link>
    </div>
  </nav></header>;
}
