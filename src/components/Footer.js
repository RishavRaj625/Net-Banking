import React from "react";

const footerStyles = {
  footer: {
    backgroundColor: "#1E293B",
    color: "#CBD5E1",
    padding: "3rem 0 1.5rem 0",
    width: "100%",
    position: "relative",
    bottom: 0,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    marginBottom: "2rem",
  },
  section: {
    textAlign: "left",
  },
  sectionTitle: {
    color: "white",
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  link: {
    color: "#CBD5E1",
    textDecoration: "none",
    display: "block",
    marginBottom: "0.5rem",
    transition: "color 0.2s",
  },
  bottom: {
    borderTop: "1px solid #334155",
    paddingTop: "1.5rem",
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: "0.875rem",
    color: "#94A3B8",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
};

const Footer = () => {
  const year = new Date().getFullYear();

  const handleLinkHover = (e) => {
    e.target.style.color = "#4F46E5";
  };

  const handleLinkLeave = (e) => {
    e.target.style.color = "#CBD5E1";
  };

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.container}>
        <div style={footerStyles.gridContainer}>
          <div style={footerStyles.section}>
            <h3 style={footerStyles.sectionTitle}>NetBank</h3>
            <div style={footerStyles.contactInfo}>
              <p>Customer Service: 1-800-NET-BANK</p>
              <p>Email: support@netbank.com</p>
              <p>Available 24/7</p>
            </div>
          </div>

          <div style={footerStyles.section}>
            <h3 style={footerStyles.sectionTitle}>Services</h3>
            <a
              href="/online-banking"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Online Banking
            </a>
            <a
              href="/mobile-banking"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Mobile Banking
            </a>
            <a
              href="/investments"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Investments
            </a>
            <a
              href="/loans"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Loans
            </a>
          </div>

          <div style={footerStyles.section}>
            <h3 style={footerStyles.sectionTitle}>Resources</h3>
            <a
              href="/security"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Security Center
            </a>
            <a
              href="/faqs"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              FAQs
            </a>
            <a
              href="/locations"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Branch Locations
            </a>
            <a
              href="/contact"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Contact Us
            </a>
          </div>

          <div style={footerStyles.section}>
            <h3 style={footerStyles.sectionTitle}>Legal</h3>
            <a
              href="/privacy"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Terms of Service
            </a>
            <a
              href="/accessibility"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Accessibility
            </a>
            <a
              href="/security-policy"
              style={footerStyles.link}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Security Policy
            </a>
          </div>
        </div>

        <div style={footerStyles.bottom}>
          <p>&copy; {year} NetBank. All rights reserved. RBI Insured.</p>

          {/* <p>&copy; {new Date().getFullYear()} NetBank. All rights reserved. RBI Insured.</p> */}
          <p>Website designed by Rishav</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
