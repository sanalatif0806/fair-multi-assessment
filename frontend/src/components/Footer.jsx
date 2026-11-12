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
