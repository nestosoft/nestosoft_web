import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Navigation = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return (<>
      <button
        className="mobile-toggle"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
      >
        <span className="mobile-toggle-bar" />
        <span className="mobile-toggle-bar" />
        <span className="mobile-toggle-bar" />
      </button>

      <ul className="nav-links">
        <li><a href="#home">{t('nav.home')}</a></li>
        <li><a href="#services">{t('nav.services')}</a></li>
        <li><a href="#about">{t('nav.about')}</a></li>
        <li><a href="#contact">{t('nav.contact')}</a></li>
      </ul>

      {open && (
        <ul id="mobile-nav" className="mobile-nav" onClick={close}>
          <li><a href="#home">{t('nav.home')}</a></li>
          <li><a href="#services">{t('nav.services')}</a></li>
          <li><a href="#about">{t('nav.about')}</a></li>
          <li><a href="#contact">{t('nav.contact')}</a></li>
        </ul>
      )}
    </>)
}

export default Navigation