
import {  Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import ThemeToggle from './ThemeToggle';
import logo from '../../public/nestosoft_logo_black_icon.svg'


const Layout = ({}) => {
    console.log(import.meta.env.VITE_HOST)   
    return (
        <div className='min-h-screen bg-white dark:bg-gray-900 container mx-auto mt-4 transition-colors'>
          <header className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center'>
              <img alt="nestosoft logo"  src={logo} className='h-8 mr-2 '/>
              <Navigation />
            </div>
            <ThemeToggle />
          </header>
          <div className='content mt-2'>
            <Outlet />
          </div>
          <footer className='text-gray-600 dark:text-gray-400 mt-8'>
            Hosted in {import.meta.env.VITE_HOST}
          </footer>
        </div> 
    )
} 

export default Layout
