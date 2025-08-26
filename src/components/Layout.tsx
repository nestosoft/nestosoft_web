
import {  Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next'
import logo from '../../public/nestosoft-logo.png'


const Layout = ({}) => {
    const { t } = useTranslation();
    return (
        <div className='min-h-screen bg-black text-white'>
          <header className='fixed top-0 w-full z-[1000] bg-black/80 backdrop-blur-xl border-b border-white/10'>
            <nav className='container flex flex-row items-center justify-between py-8'>
              <div className='logo flex items-center gap-2'>
                <img alt="nestosoft logo" src={logo} className='h-6' />
                <span className='hidden md:inline'>NESTOSOFT</span>
              </div>
              <Navigation />
              <LanguageSwitcher />
            </nav>
          </header>
          <main className='pt-[140px] md:pt-[180px]'>
            <Outlet />
          </main>
          <footer className='text-white/40 text-center py-12 border-t border-white/10'>
            © {new Date().getFullYear()} Nestosoft. {t('footer.rights')}
          </footer>
        </div> 
    )
} 

export default Layout
