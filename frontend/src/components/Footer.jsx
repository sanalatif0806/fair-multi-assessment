// Site footer: copyright line, authors and an institution logo.
//
// Everything identifying comes from build-time settings, not from this file,
// so the same code can be published anonymously (no settings -> no footer).
//   VITE_FOOTER_AUTHORS   e.g. "Jane Doe and John Roe"
//   VITE_FOOTER_LOGO      image path inside frontend/public, e.g. "footer-logo.png"
//   VITE_FOOTER_LOGO_ALT  alt text for the logo, e.g. "University logo"
//   VITE_FOOTER_LOGO_LINK optional link opened when the logo is clicked
const AUTHORS = import.meta.env.VITE_FOOTER_AUTHORS || "";
const LOGO = import.meta.env.VITE_FOOTER_LOGO || "";
const LOGO_ALT = import.meta.env.VITE_FOOTER_LOGO_ALT || "Institution logo";
const LOGO_LINK = import.meta.env.VITE_FOOTER_LOGO_LINK || "";

export default function Footer() {
  if (!AUTHORS && !LOGO) return null;

  const logo = LOGO && (
    <img className="app-footer__logo" src={`${import.meta.env.BASE_URL}${LOGO}`} alt={LOGO_ALT} />
  );

  return (
    <footer className="app-footer">
      <p className="app-footer__line">© {new Date().getFullYear()} FAIR Multi-Assessor. All rights reserved.</p>
      {AUTHORS && <p className="app-footer__line">{AUTHORS}</p>}
      {logo && (LOGO_LINK ? (
        <a href={LOGO_LINK} target="_blank" rel="noreferrer">{logo}</a>
      ) : logo)}
    </footer>
  );
}
