import { useState } from "react";

const styles = `
  
`;

const navItems = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

export default function Menu() {
  const [active, setActive] = useState("Services");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{styles}</style>

      <nav>
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 1h7l3 3v10a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1zm6 0v3h3M5 8h6M5 11h4" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          Camba<span>PDF</span>
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {navItems.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={active === label ? "active" : ""}
                onClick={() => setActive(label)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button className="nav-cta">Get Started</button>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Mobile menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {navItems.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => { setActive(label); setMenuOpen(false); }}
            >
              {label}
            </a>
          ))}
          <button className="nav-cta">Get Started</button>
        </div>
      </nav>

      {/* Demo content */}
      <div className="demo-page">
        <h1>Work smarter<br />with <span>PDFs</span></h1>
        <p>Convert, compress, and collaborate — everything you need for your documents in one place.</p>
      </div>
    </>
  );
}




export const NavBar = ()=>{
    return (
            <div>
                <Menu></Menu>
                <ul>
                    <li>Home</li>
                    <li>Service</li>
                    <li>About</li>
                </ul>
            </div>
    )
}