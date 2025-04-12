import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => {
    const[isFixed,setIsFixed] = useState(false);
    const[isVisible,setIsVisible] = useState(false);

    useEffect(() => {
      const handleScroll = ()=>{
        const scrollY = window.scrollY;

        if(scrollY > 100){
           if(!isVisible) setIsVisible(true);
      } else{
          if(isVisible) setIsVisible(false);
      }

      if(scrollY > 400){
        if(!isFixed) setIsFixed(true);
      } else{
        if(isFixed) setIsFixed(false);
      }
      };
      window.addEventListener('scroll',handleScroll);
      return () => window.removeEventListener('scroll',handleScroll);
      
    }, [isFixed,isVisible]);

  return (
    <nav className={`bg-gray-900 text-white p-4 px-6 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-center md:justify-between transition-all duration-300 
      ${isVisible ? 'opacity-100' : 'opacity-0'}
      ${isFixed ? 'fixed top-0 left-0 right-0 z-10' : ''}`}>
        {/* logo */}
        <h1 className='text-2xl font-bold mb-2 md:mb-0 md:mr-10'>DevForge</h1>

        <div className='flex gap-15 justify-center flex-grow'>
            <Link to="/" className='hover:text-yellow-300'>Home</Link>
            <Link to="/auth" className='hover:text-yellow-300'>Login/ Sign Up</Link>
            <Link to="/snippets" className='hover:text-yellow-300'>Snippets</Link>
        </div>
        
    </nav>
  )
}

export default Navbar