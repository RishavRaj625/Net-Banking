import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const navStyles = {
  nav: {
    backgroundColor: "#ffffff",
    color: "#4F46E5",
    padding: "0.75rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderBottom: "1px solid #e5e7eb",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#4F46E5",
    textDecoration: "none",
  },
  desktopMenu: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  link: {
    color: "#4F46E5",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    transition: "all 0.2s",
    borderRadius: "0.375rem",
    fontWeight: "500",
  },
  registerButton: {
    backgroundColor: "#4F46E5",
    color: "white",
    padding: "0.5rem 1.5rem",
    borderRadius: "0.375rem",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  mobileMenuButton: {
    display: "none",
    background: "none",
    border: "none",
    color: "#4F46E5",
    cursor: "pointer",
    padding: "0.5rem",
    "@media (max-width: 768px)": {
      display: "block",
    },
  },
  mobileMenu: {
    display: "none",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "white",
    "@media (max-width: 768px)": {
      display: "flex",
    },
  },
};

const Logo = () => (
  <svg
    width="120"
    height="30"
    viewBox="0 0 200 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M30 10L50 25H10L30 10Z" fill="#4F46E5" />
    <rect x="15" y="25" width="30" height="20" fill="#4F46E5" />
    <rect x="20" y="30" width="5" height="8" fill="white" />
    <rect x="35" y="30" width="5" height="8" fill="white" />
    <text
      x="60"
      y="35"
      fontFamily="Arial"
      fontWeight="bold"
      fontSize="24"
      fill="#4F46E5"
    >
      NetBank
    </text>
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkHover = (e) => {
    e.target.style.backgroundColor = "#EEF2FF";
  };

  const handleLinkLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
  };

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = "#4338CA";
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = "#4F46E5";
  };

  return (
    <nav style={navStyles.nav}>
      <div style={navStyles.container}>
        <a href="/" style={navStyles.logo}>
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <div style={navStyles.desktopMenu}>
          <a
            href="/"
            style={navStyles.link}
            onMouseEnter={handleLinkHover}
            onMouseLeave={handleLinkLeave}
          >
            Home
          </a>
          <a
            href="/transactions"
            style={navStyles.link}
            onMouseEnter={handleLinkHover}
            onMouseLeave={handleLinkLeave}
          >
            Transactions
          </a>
          <a
            href="/login"
            style={navStyles.link}
            onMouseEnter={handleLinkHover}
            onMouseLeave={handleLinkLeave}
          >
            Login
          </a>

          <a href="/register">
            <button
              style={navStyles.registerButton}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Register
            </button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={navStyles.mobileMenuButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            ...navStyles.mobileMenu,
            display: isOpen ? "flex" : "none",
          }}
        >
          <a href="/" style={navStyles.link}>
            Home
          </a>
          <a href="/transactions" style={navStyles.link}>
            Transactions
          </a>
          <a href="/login" style={navStyles.link}>
            Login
          </a>
          <button style={navStyles.registerButton}>Register</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
