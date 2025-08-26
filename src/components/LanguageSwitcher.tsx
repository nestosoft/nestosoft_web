import { useState } from "react";
import { useTranslation } from "react-i18next";

const Flag = ({ label, active, onClick, children }: { label: string; active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`h-8 w-8 rounded-full flex items-center justify-center transition-opacity ${active ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
    title={label}
  >
    <span style={{ fontSize: '18px', lineHeight: 1 }}>{children}</span>
  </button>
);

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = (i18n.language || 'en').startsWith('es') ? 'es' : 'en';

  const setLang = (lng: 'en' | 'es') => {
    if (current !== lng) i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="lang-inline flex items-center gap-3">
        <Flag label="English (GB)" active={current === 'en'} onClick={() => setLang('en')}>🇬🇧</Flag>
        <Flag label="Español (ES)" active={current === 'es'} onClick={() => setLang('es')}>🇪🇸</Flag>
      </div>

      <button
        className="lang-toggle"
        aria-label="Open language menu"
        aria-expanded={open}
        aria-controls="lang-menu"
        onClick={() => setOpen(!open)}
      >
        <span style={{ fontSize: '18px', lineHeight: 1 }}>{current === 'en' ? '🇬🇧' : '🇪🇸'}</span>
      </button>

      {open && (
        <ul id="lang-menu" className="lang-nav" role="menu">
          <li role="menuitem"><button onClick={() => setLang('en')} className="lang-item">🇬🇧 English</button></li>
          <li role="menuitem"><button onClick={() => setLang('es')} className="lang-item">🇪🇸 Español</button></li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
