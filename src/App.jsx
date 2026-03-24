import { useState } from "react";

const PINK = "#F472B6";
const BLUE = "#7DD3FC";
const DARK = "#0B1120";
const DARK2 = "#111827";
const DARK3 = "#1E293B";
const LIGHT = "#F8FAFC";
const GRAY = "#94A3B8";
const PHONE = "(305) 555-0199";

function PhoneBtn({ full = false }) {
  return (
    <a href={`tel:${PHONE.replace(/\D/g, "")}`} style={{
      display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 36px",
      background: PINK, color: "#fff", border: "none", borderRadius: 50,
      fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 700,
      textDecoration: "none", letterSpacing: 0.5, width: full ? "100%" : "auto", justifyContent: "center",
    }}>📞 {PHONE}</a>
  );
}

function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(11,17,32,0.95)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(244,114,182,0.08)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, padding: "0 max(20px,4vw)" }}>
        <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: PINK, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 16 }}>
              {[10, 14, 12, 16, 13].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, borderRadius: 1, background: i % 2 === 0 ? "#fff" : BLUE }} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 700, color: PINK, letterSpacing: 1, lineHeight: 1.1 }}>MAGIC CITY</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8, fontWeight: 400, color: BLUE, letterSpacing: 3, lineHeight: 1.1 }}>DETAILING</div>
          </div>
        </a>
        <PhoneBtn />
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: `linear-gradient(165deg, ${DARK} 0%, #12091E 40%, #0F1B2E 100%)`,
      position: "relative", overflow: "hidden", padding: "100px max(20px,4vw) 60px",
    }}>
      <div style={{ position: "absolute", top: "12%", right: "-6%", width: "50vw", height: "50vw", background: `radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)`, borderRadius: "50%" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "-12%", width: "40vw", height: "40vw", background: `radial-gradient(circle, rgba(125,211,252,0.04) 0%, transparent 70%)`, borderRadius: "50%" }} />
      <div style={{ maxWidth: 720, position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block", padding: "5px 16px", borderRadius: 50,
          border: "1px solid rgba(244,114,182,0.25)", marginBottom: 24,
          fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: PINK, letterSpacing: 2, textTransform: "uppercase",
        }}>Miami's Mobile Detailing Experts</div>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(34px,5.5vw,60px)", fontWeight: 700, color: LIGHT, lineHeight: 1.1, margin: "0 0 8px" }}>
          Showroom-Quality
        </h1>
        <h1 style={{
          fontFamily: "'Playfair Display',serif", fontSize: "clamp(34px,5.5vw,60px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 20px",
          background: `linear-gradient(135deg, ${PINK}, ${BLUE})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Mobile Detailing</h1>

        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(15px,1.8vw,19px)", color: GRAY, lineHeight: 1.7, maxWidth: 540, marginBottom: 32 }}>
          We come to you — home, office, or anywhere in Miami-Dade. From daily drivers to exotics, every vehicle gets the VIP treatment.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
          <PhoneBtn />
          <a href="#packages" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px",
            background: "transparent", color: BLUE, border: `1.5px solid rgba(125,211,252,0.25)`,
            borderRadius: 50, fontFamily: "'Outfit',sans-serif", fontSize: 16, fontWeight: 600, textDecoration: "none",
          }}>View Packages ↓</a>
        </div>

        <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
          {[{ v: "We Come", l: "To You" }, { v: "All Makes", l: "& Models" }, { v: "Premium", l: "Products Only" }].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 24, fontWeight: 700, color: LIGHT }}>{s.v}</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: GRAY, letterSpacing: 1, textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  const pkgs = [
    {
      name: "Interior Detail",
      price: "$199+",
      desc: "Deep interior restoration",
      items: ["Full vacuum & compressed air blowout", "Carpet & seat shampoo extraction", "Leather cleaning & conditioning", "Dashboard & console deep clean", "Window cleaning inside & out", "Air freshener treatment"],
      time: "~2.5 hours",
      highlight: false,
    },
    {
      name: "Full Detail",
      price: "$299+",
      desc: "Complete inside & out — our most popular",
      items: ["Everything in Interior Detail", "Hand wash & dry", "Clay bar decontamination", "One-step polish & carnauba wax", "Wheel & tire detail", "Door jambs & trim dressing"],
      time: "~3.5 hours",
      highlight: true,
    },
    {
      name: "Showroom Elite",
      price: "$499+",
      desc: "Concours-level restoration",
      items: ["Everything in Full Detail", "Multi-stage paint correction", "Ceramic sealant application", "Engine bay detail", "Headlight restoration", "Trim & plastic restoration", "6-month protection guarantee"],
      time: "~5–6 hours",
      highlight: false,
    },
  ];

  return (
    <section id="packages" style={{ background: DARK2, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: PINK, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Packages</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: LIGHT, margin: "0 0 12px" }}>Detailing Packages</h2>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 15, color: GRAY }}>Pricing based on sedan. SUVs, trucks, and exotics quoted individually.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 20 }}>
          {pkgs.map(p => (
            <div key={p.name} style={{
              background: DARK3, borderRadius: 20, padding: 32, position: "relative", overflow: "hidden",
              border: p.highlight ? `1.5px solid ${PINK}44` : "1px solid rgba(255,255,255,0.04)",
              display: "flex", flexDirection: "column",
            }}>
              {p.highlight && <div style={{
                position: "absolute", top: 14, right: -28, background: PINK, color: "#fff",
                fontFamily: "'Outfit',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 1,
                padding: "4px 36px", transform: "rotate(45deg)", textTransform: "uppercase",
              }}>Popular</div>}

              <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 18, fontWeight: 700, color: LIGHT, margin: "0 0 4px" }}>{p.name}</h3>
              <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, margin: "0 0 12px" }}>{p.desc}</p>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: PINK, marginBottom: 4 }}>{p.price}</div>
              <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: BLUE, marginBottom: 16 }}>{p.time}</div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
                {p.items.map(i => (
                  <li key={i} style={{
                    fontFamily: "'Outfit',sans-serif", fontSize: 13, color: "#CBD5E1", padding: "6px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.03)", display: "flex", gap: 8, alignItems: "center",
                  }}>
                    <span style={{ color: PINK, fontSize: 9 }}>●</span>{i}
                  </li>
                ))}
              </ul>

              <a href={`tel:${PHONE.replace(/\D/g, "")}`} style={{
                display: "block", textAlign: "center", padding: "12px 0", borderRadius: 50,
                background: p.highlight ? PINK : "transparent",
                border: p.highlight ? "none" : `1px solid ${PINK}44`,
                color: p.highlight ? "#fff" : PINK,
                fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 700, textDecoration: "none",
              }}>Book This Package →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AddOns() {
  const items = [
    { name: "Ceramic Coating", price: "$799+", desc: "Long-lasting hydrophobic protection" },
    { name: "Paint Correction", price: "$249+", desc: "Remove swirls, scratches, and oxidation" },
    { name: "Headlight Restoration", price: "$79+", desc: "Crystal-clear headlights again" },
    { name: "Pet Hair Removal", price: "$59+", desc: "Deep extraction from seats and carpet" },
    { name: "Odor Elimination", price: "$99+", desc: "Ozone treatment for stubborn smells" },
    { name: "Engine Bay Detail", price: "$89+", desc: "Degreased, dressed, and show-ready" },
  ];

  return (
    <section style={{ background: DARK, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: BLUE, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Extras</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: LIGHT, margin: 0 }}>Premium Add-Ons</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
          {items.map(it => (
            <div key={it.name} style={{
              background: DARK3, borderRadius: 12, padding: "18px 22px",
              border: "1px solid rgba(255,255,255,0.03)", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <h4 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 600, color: LIGHT, margin: "0 0 2px" }}>{it.name}</h4>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, color: GRAY, margin: 0 }}>{it.desc}</p>
              </div>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, fontWeight: 700, color: PINK, flexShrink: 0, marginLeft: 16 }}>{it.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fleet() {
  return (
    <section style={{ background: DARK2, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: PINK, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>For Businesses</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: LIGHT, margin: "0 0 16px" }}>Fleet & Dealership Programs</h2>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: GRAY, lineHeight: 1.7, marginBottom: 24 }}>
          Auto dealerships, rental companies, rideshare drivers, and corporate fleets — we offer volume pricing and recurring service contracts that keep your vehicles looking their best without disrupting your operations.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          {["Volume discounts", "Recurring schedules", "On-site service", "Dedicated account manager"].map(f => (
            <span key={f} style={{
              padding: "8px 18px", borderRadius: 50, background: "rgba(244,114,182,0.06)",
              border: "1px solid rgba(244,114,182,0.12)",
              fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 500, color: PINK,
            }}>{f}</span>
          ))}
        </div>
        <PhoneBtn />
      </div>
    </section>
  );
}

function Areas() {
  const a = ["Miami", "Miami Beach", "Coral Gables", "Hialeah", "Doral", "Kendall", "Homestead", "Aventura", "North Miami", "Brickell", "Wynwood", "Coconut Grove", "Key Biscayne", "Pinecrest", "Palmetto Bay", "Little Havana"];
  return (
    <section style={{ background: DARK, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 600, color: BLUE, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Coverage</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: LIGHT, margin: "0 0 24px" }}>Mobile Detailing Across Miami-Dade</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 24 }}>
          {a.map(x => (
            <span key={x} style={{ padding: "7px 16px", borderRadius: 50, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 500, color: "#CBD5E1" }}>{x}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ background: `linear-gradient(135deg, ${PINK}18, ${BLUE}0D)`, padding: "80px max(20px,4vw)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: LIGHT, margin: "0 0 12px" }}>Your Car Deserves Better</h2>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 16, color: GRAY, lineHeight: 1.7, marginBottom: 32 }}>
          Book your mobile detail today. We bring the showroom to you — anywhere in Miami-Dade County.
        </p>
        <PhoneBtn />
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: GRAY, marginTop: 20 }}>
          or visit <a href="https://magiccityservices.com" style={{ color: BLUE, textDecoration: "none", fontWeight: 600 }}>magiccityservices.com</a> for all our services
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: DARK, padding: "40px max(20px,4vw) 20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 700, color: PINK }}>MAGIC CITY</div>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8, color: BLUE, letterSpacing: 2 }}>DETAILING</div>
        </div>
        <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, color: "#475569" }}>© 2026 Magic City Services LLC — Licensed & Insured — Miami-Dade, FL</span>
      </div>
    </footer>
  );
}

export default function DetailingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0}
        html{scroll-behavior:smooth}body{background:${DARK}}
        ::selection{background:${PINK}44;color:#fff}
      `}</style>
      <Nav /><Hero /><Packages /><AddOns /><Fleet /><Areas /><CTA /><Footer />
    </>
  );
}
