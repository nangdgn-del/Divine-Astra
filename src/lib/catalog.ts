export type Product = {
  id: string; name: string; category: string; price: number; status: "Available" | "Coming soon";
  description: string; features: string[]; accent: string;
};

export const products: Product[] = [
  { id: "web-scan", name: "Astra Web Scan", category: "Web Security", price: 19, status: "Available",
    description: "A guided, rate-limited security review for websites you own or are authorized to assess.",
    features: ["TLS and security-header checks", "Basic configuration findings", "Exportable summary"], accent: "violet" },
  { id: "exposure-check", name: "Exposure Checker", category: "Web Security", price: 12, status: "Available",
    description: "Check your own site for common public exposure and misconfiguration signals.",
    features: ["Scope confirmation", "Safe request limits", "Readable findings"], accent: "blue" },
  { id: "load-check", name: "Load Readiness", category: "Performance", price: 15, status: "Available",
    description: "A controlled, low-rate availability check for infrastructure you own or manage.",
    features: ["Small bounded request volume", "Latency overview", "No proxy rotation"], accent: "cyan" },
  { id: "admin-exposure", name: "Admin Exposure Review", category: "Web Security", price: 14, status: "Available",
    description: "Review your own site's published admin entry points and security posture without attempting access.",
    features: ["Allowlisted domains only", "No credential guessing", "Configuration recommendations"], accent: "pink" },
  { id: "credential-audit", name: "Credential Hygiene Audit", category: "Account Security", price: 9, status: "Available",
    description: "A checklist and local workflow for improving password and account security.",
    features: ["MFA readiness checklist", "Password policy review", "Account recovery review"], accent: "gold" },
  { id: "remote-access", name: "Remote Access Suite", category: "Upcoming", price: 0, status: "Coming soon",
    description: "Upcoming: transparent, consent-based remote administration for devices you manage.",
    features: ["Explicit consent", "Visible sessions", "Auditable access"], accent: "violet" }
];
