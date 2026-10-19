import { useState } from "react";
import { Page, Promo, Nav, Hero, Tiles, How, Booking, Pricing, PriceList, Areas, Band, Footer, MemberSignup, goTo, ArrowIcon } from "./SiteKit";

/*
  MAGIC CITY DETAILING — v4 (Oct 2026 redesign)
  Layout and booking live in SiteKit.jsx (shared with the other Magic City sites).
  Deposit amounts are enforced server-side in api/create-checkout.js.
*/

const PACKAGES = [
  { name: "Interior Detail", price: "$249", deposit: 65, note: "Deep clean, condition, protect", tag: null },
  { name: "Full Detail (Int + Ext)", price: "$349", deposit: 90, note: "Complete interior + exterior", tag: "Most Popular" },
  { name: "Showroom Elite", price: "$599", deposit: 300, note: "The works — premium package", tag: "Premium" },
  { name: "Ceramic Coating", price: "$999+", deposit: 500, note: "Long-term paint protection", tag: null },
];

const ADDONS = [
  { name: "1-Step Gloss Enhancement", price: "$249" },
  { name: "Paint Correction (2-Step)", price: "$549+" },
  { name: "Headlight Restoration", price: "$89" },
  { name: "Pet Hair Removal", price: "$59+" },
  { name: "Odor Elimination", price: "$79" },
  { name: "Engine Bay Detail", price: "$89+" },
];

const PACKAGE_SPECS = {
  "Interior Detail": {
    time: "1-2 hours",
    items: [
      "Full interior vacuum (seats, carpets, floor mats, trunk, crevices, under seats)",
      "Floor mat removal, cleaning, and reinstallation",
      "Dashboard, center console, and door panel wipe-down and dressing",
      "Air vent cleaning and dust removal",
      "Steering wheel, gear shift, and control surface cleaning",
      "Cup holder and storage compartment cleanout",
      "Interior window and mirror cleaning (streak-free)",
      "Leather/vinyl conditioning (seats, doors, and trim)",
      "Fabric seats: spot treatment and light shampoo",
      "Door jamb wipe-down",
      "Seat belt wipe-down",
      "Rubber/plastic trim UV protectant application",
      "Air freshener application",
      "Final inspection and touch-up",
    ],
  },
  "Full Detail (Int + Ext)": {
    time: "2-4 hours",
    tierUp: "Everything in Interior Detail, PLUS:",
    items: [
      "Full hand wash (two-bucket method, pH-neutral soap)",
      "Wheel and tire cleaning (brake dust removal, tire scrub)",
      "Tire dressing / tire shine application",
      "Wheel well cleaning",
      "Door jamb detail cleaning",
      "Bug and tar removal (front bumper, hood, mirrors)",
      "Clay bar light pass on paint surface (contamination removal)",
      "Hand-dry with microfiber towels (scratch-free)",
      "Spray wax / sealant application (3-4 week paint protection)",
      "Exterior window and mirror cleaning",
      "Exterior plastic and rubber trim dressing",
      "Chrome and metal accent polishing",
      "Exhaust tip cleaning",
      "Final walk-around inspection",
    ],
  },
  "Showroom Elite": {
    time: "3-6 hours",
    tierUp: "Everything in Full Detail, PLUS:",
    items: [
      "Deep carpet and upholstery extraction (hot water shampoo/steam)",
      "Leather deep clean and conditioner (multi-step treatment)",
      "Headliner spot cleaning",
      "Full clay bar treatment (all painted surfaces, thorough decontamination)",
      "One-step machine polish (removes light swirl marks, minor scratches, oxidation)",
      "Premium paint sealant application (60-90 day protection)",
      "Engine bay surface wipe-down (light detail, not full degrease)",
      "Rubber weather seal conditioning (doors, trunk, hood)",
      "Plastic trim restoration (faded exterior trim rejuvenation)",
      "Glass water spot treatment (exterior windshield and windows)",
      "Detailed wheel face polish",
      "Final hand buff and inspection under direct light",
    ],
  },
  "Ceramic Coating": {
    time: "6-10 hours (may require 2-day service)",
    tierUp: "Full Showroom Elite Detail, PLUS:",
    items: [
      "Multi-step paint correction (machine compound + polish to remove swirls, scratches, and oxidation)",
      "Surface prep with IPA wipe-down (removes all oils and residue before coating)",
      "Professional-grade ceramic coating application (all painted surfaces)",
      "Coating curing period (minimum 1-2 hours after application)",
      "Hydrophobic protection lasting 1-2 years",
      "UV protection to prevent paint fading and oxidation",
      "Chemical resistance against bird droppings, tree sap, and road contaminants",
      "Enhanced gloss and depth of paint color",
      "Customer care instructions provided (48-hour no-wash curing window, recommended maintenance schedule)",
    ],
    note: "Final price depends on vehicle size and paint condition. Vehicles with heavy swirling, scratches, or oxidation may require additional paint correction time at an adjusted rate.",
  },
};

const ADDON_SPECS = {
  "Headlight Restoration": {
    price: "$89",
    items: [
      "Headlight lens sanding (progressive grit: 800 → 1500 → 2500)",
      "Machine polish to restore clarity",
      "UV-resistant clear coat application to prevent future yellowing",
      "Both headlights included",
    ],
  },
  "1-Step Gloss Enhancement": {
    price: "$249",
    items: [
      "Single-stage machine polish",
      "Removes light swirl marks and haze",
      "Restores gloss and depth",
      "Great before a sealant or for a quick refresh",
    ],
  },
  "Paint Correction (2-Step)": {
    price: "$549+",
    items: [
      "Two-stage machine compound and polish",
      "Removes moderate swirl marks, scratches, and water spots",
      "Restores paint depth and gloss",
      "Recommended before any ceramic coating application",
    ],
  },
  "Pet Hair Removal": {
    price: "$59",
    items: [
      "Specialized rubber and bristle tool extraction from all fabric surfaces",
      "Seat, carpet, floor mat, and trunk deep pet hair removal",
      "Lint roller and detail brush finishing pass",
    ],
  },
  "Odor Elimination": {
    price: "$79",
    items: [
      "Source identification and removal",
      "Ozone treatment or enzyme-based odor neutralizer application",
      "Full interior surface wipe-down with antibacterial solution",
      "Vent system deodorizing treatment",
      "Air freshener application",
    ],
  },
  "Engine Bay Detail": {
    price: "$89",
    items: [
      "Surface rinse and degreasing of engine bay",
      "Plastic and rubber component dressing",
      "Hose, cap, and reservoir wipe-down",
      "Metal surface cleaning",
      "Protective dressing application",
    ],
  },
};

const VEHICLE_SURCHARGES = [
  "Sedan / Coupe / Hatchback: Base price as listed",
  "SUV / Crossover / Minivan: +$20",
  "Full-Size Truck / Large SUV (Suburban, Expedition, etc.): +$40",
  "Excessive dirt, pet hair, or biohazard conditions: May require custom quote",
];

const DETAIL_SERVICES = [
  { icon: "🧽", name: "Interior Detail", desc: "Vacuum, shampoo, leather condition, dashboard, door panels" },
  { icon: "✨", name: "Exterior Wash & Wax", desc: "Hand wash, clay bar, wax, tire shine, trim restore" },
  { icon: "🛡️", name: "Ceramic Coating", desc: "Professional-grade ceramic protection for lasting shine" },
  { icon: "🎨", name: "Paint Correction", desc: "Remove swirls, scratches, oxidation — restore factory finish" },
  { icon: "💨", name: "Odor Elimination", desc: "Deep ozone treatment for smoke, pets, mold, spills" },
  { icon: "🚗", name: "We Come to You", desc: "Full mobile setup — we detail at your home or office" },
];

const PHONE = "3053068078";
const PHONE_DISPLAY = "(305) 306-8078";

const TILES = [
  { name: "Full detail", from: "From $349", pkg: 1, img: "/images/v4/hand-wash", cta: "Book a full detail", blurb: "Hand wash, clay, wax and a complete interior clean, done in your driveway." },
  { name: "Interior detail", from: "From $249", pkg: 0, img: "/images/v4/interior-detail", cta: "Book an interior", blurb: "Seats, carpets, leather, vents and every surface deep cleaned and protected." },
  { name: "Ceramic & paint correction", from: "From $999", pkg: 3, img: "/images/v4/mobile-detailing-polish", cta: "Book ceramic coating", blurb: "Machine polish to remove swirls, then ceramic protection that lasts years." },
  { name: "Headlights & add-ons", from: "From $59", jump: "addons", img: "/images/v4/headlight-restoration", cta: "See add-ons", blurb: "Headlight restoration, pet hair, odor removal and engine bay cleaning." },
];

const CLUB = [
  { id: "club_monthly", name: "Monthly", label: "Detail Club, monthly", monthly: 129, price: "$129", visits: "One maintenance detail every month", featured: false },
  { id: "club_biweekly", name: "Every two weeks", label: "Detail Club, every two weeks", monthly: 229, price: "$229", visits: "A maintenance detail every other week", featured: true },
];

export default function DetailingSite() {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [tab, setTab] = useState("book");
  const [openKey, setOpenKey] = useState(null);
  const [quoteValue, setQuoteValue] = useState(null);
  const [clubPlan, setClubPlan] = useState("club_biweekly");

  const pick = (t) => {
    if (t.jump) { goTo(t.jump); return; }
    setSelectedPkg(t.pkg); setTab("book"); goTo("booking");
  };
  const askClub = () => { setQuoteValue("Detail Club membership"); setTab("quote"); goTo("booking"); };
  const joinClub = (id) => { setClubPlan(id); goTo("signup"); };
  const addons = ADDONS.map(a => ({ name: a.name, price: a.price, note: "" }));

  return (
    <Page>
      <Promo />
      <Nav sub="Mobile Detailing" phone={PHONE} phoneDisplay={PHONE_DISPLAY}
        links={[{ id: "services", label: "Services" }, { id: "pricing", label: "Pricing" }, { id: "club", label: "Detail Club" }, { id: "areas", label: "Areas" }]} />

      <Hero
        img="/images/v4/hero-foam-night.webp"
        mobileImg="/images/v4/hero-foam-night-mobile.webp"
        alt="Mobile detailer foaming a white sports car in a Miami driveway at night"
        where="We come to you across Miami-Dade, Broward and Palm Beach"
        title="Mobile car detailing at your home or office"
        copy="Interior and full details, paint correction and ceramic coating, done in your driveway. Pick a package, pay a small deposit to hold your time, and we bring everything."
        bookLabel="Book a detail"
        phone={PHONE} phoneDisplay={PHONE_DISPLAY}
        facts={[["Fully mobile", "We bring the water, power and products"], ["Prices up front", "Starting prices posted for every package"], ["Hablamos español", "Call or book in Spanish"]]}
      />

      <Tiles id="services" heading="Detailing packages" lede="Tap a package to start a booking with it picked. SUVs add $20 and trucks or large SUVs add $40."
        tiles={TILES} onPick={pick} />

      <How img="/images/v4/keys-handoff" alt="Detailer handing keys back to a customer beside her freshly detailed car" />

      <Booking service="Mobile Detailing" siteName="magiccitydetailingmiami.com" heading="Book your detail"
        intro="Choose a package, tell us about your car and pick a time, then pay a small deposit to hold it. We'll come to your home or office."
        packages={PACKAGES} selectedPkg={selectedPkg} setSelectedPkg={setSelectedPkg} tab={tab} setTab={setTab}
        phone={PHONE} phoneDisplay={PHONE_DISPLAY} needsVehicle quoteValue={quoteValue}
        quoteOptions={["Interior detail", "Full detail", "Showroom Elite", "Ceramic coating", "Paint correction", "Detail Club membership", "Fleet or multiple cars", "Something else"]}
        quotePrompt="Tell us about your car" quotePlaceholder="Year, make and model, and what you'd like done: pet hair, odor, swirls, ceramic, anything else." />

      <Pricing heading="Detailing prices" lede="Prices are for sedans and coupes. SUVs and crossovers add $20; trucks and large SUVs add $40. Your exact price is confirmed before we start."
        img="/images/v4/interior-detail" imgAlt="Interior detail in progress">
        <PriceList packages={PACKAGES} specs={PACKAGE_SPECS} openKey={openKey} setOpenKey={setOpenKey} />
        <h3 className="subhead" id="addons">Add-ons</h3>
        <p className="subnote">Add any of these to a package. Mention them when you book or on your quote.</p>
        <PriceList packages={addons} specs={ADDON_SPECS} openKey={openKey} setOpenKey={setOpenKey} prefix="addon_" />
        <div className="extra-box">
          <div className="price-row"><div><h3>Vehicle size</h3><p>Added to any package</p></div></div>
          <ul>{VEHICLE_SURCHARGES.map(i => <li key={i}>{i}</li>)}</ul>
        </div>
      </Pricing>

      <section id="club" className="section member">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">Detail Club</h2>
            <p className="lede">Keep your car looking freshly detailed with regular maintenance visits at home, for one monthly price.</p>
          </div>
          <div className="member-grid">
            {CLUB.map(c => (
              <div key={c.name} className={"plan" + (c.featured ? " is-featured" : "")}>
                <h3>{c.name}</h3>
                <p className="plan-price">{c.price}<small>/month</small></p>
                <ul className="checks">
                  <li>{c.visits}: exterior hand wash and interior refresh</li>
                  <li>15% off any other service</li>
                  <li>Priority scheduling</li>
                </ul>
                <button className={"btn " + (c.featured ? "btn-pink" : "btn-outline")} onClick={() => joinClub(c.id)}>
                  <span className="btn-label">Join {c.name.toLowerCase()}</span>
                  <span className="btn-icon"><ArrowIcon /></span>
                </button>
              </div>
            ))}
          </div>
          <p className="member-fine">Membership starts with a Full Detail (your first visit, paid at signup) Monthly billing starts 30 days later. Cancel anytime. <button type="button" className="link" onClick={askClub}>Have a question first? Ask us.</button></p>
          <MemberSignup kind="club" plans={CLUB} plan={clubPlan} setPlan={setClubPlan} phoneDisplay={PHONE_DISPLAY} siteName="magiccitydetailingmiami.com" />
        </div>
      </section>

      <section className="section info alt">
        <div className="wrap">
          <div className="section-head">
            <h2 className="h2">What we do</h2>
            <p className="lede">Everything is done on site. You don't need to drop the car anywhere.</p>
          </div>
          <ul className="info-grid">
            {DETAIL_SERVICES.map(c => <li key={c.name}><h3>{c.name}</h3><p>{c.desc}</p></li>)}
          </ul>
        </div>
      </section>

      <Areas />
      <Band phone={PHONE} phoneDisplay={PHONE_DISPLAY} onQuote={() => { setTab("quote"); goTo("booking"); }} />
      <Footer sub="Mobile Detailing" current="Mobile Detailing" phone={PHONE} phoneDisplay={PHONE_DISPLAY}
        about="Magic City Detailing brings interior and exterior detailing, paint correction and ceramic coating to your driveway across South Florida. Part of Magic City Services." />
    </Page>
  );
}
