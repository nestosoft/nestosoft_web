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
  const current = (i18n.language || 'en').startsWith('es') ? 'es' : 'en';

  const setLang = (lng: 'en' | 'es') => {
    if (current !== lng) i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-3">
      <Flag label="English (GB)" active={current === 'en'} onClick={() => setLang('en')}>🇬🇧</Flag>
      <Flag label="Español (ES)" active={current === 'es'} onClick={() => setLang('es')}>🇪🇸</Flag>
    </div>
  );
};

export default LanguageSwitcher;
