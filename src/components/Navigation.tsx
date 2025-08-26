import { useTranslation } from 'react-i18next'

const Navigation = () => {
    const { t } = useTranslation();
    return (<>
      <ul className="nav-links">
        <li><a href="#home">{t('nav.home')}</a></li>
        <li><a href="#services">{t('nav.services')}</a></li>
        <li><a href="#about">{t('nav.about')}</a></li>
        <li><a href="#contact">{t('nav.contact')}</a></li>
      </ul>
    </>)
}

export default Navigation