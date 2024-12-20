
import {  Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import logo from '../../public/nestosoft_logo_black_icon.svg'


const Layout = ({}) => {
    console.log(import.meta.env.VITE_HOST)   
    return (
        <div className='bg-white container mx-auto mt-4'>
          <header className='flex flex-row'>
            <img alt="nestosoft logo"  src={logo} className='h-8 mr-2 '/>
            <Navigation />
          </header>
          <div className='content mt-2'>
            <Outlet />
          </div>
          <footer>
            Hosted in {import.meta.env.VITE_HOST}
          </footer>
        </div> 
    )
} 

export default Layout