import React from 'react'

const navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-600'>&lt;</span>

          <span></span>Pass<span className='text-green-600'>OP/&gt;</span>
        </div>
        {/* <ul>
          <li className='flex gap-4 '>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">about</a>
            <a className='hover:font-bold' href="#">contact</a>
          </li> 
        </ul> */}
        <button className='flex justify-between items-center '>
          <img className =' cursor-pointer invert w-7 py-2 px-0.5' src="src/logo2.png" alt="" />
          <span className='cursor-pointer font-bold px-1.5 '>GitHub</span>
          </button>
      </div>
    </nav>
  )
}

export default navbar
