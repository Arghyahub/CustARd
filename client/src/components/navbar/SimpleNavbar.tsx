import { cn } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router-dom'

import { LogoSVG } from '@/assets'

const SimpleNavbar = ({className=''}) => {
  return (
    <div className={cn("flex flex-row h-14 w-full bg-[var(--foreground)] items-center sticky top-0 z-20",className)}>
      <div className="leftbox mx-3 gap-2 flex flex-row">
        <Link to='/'>
          <LogoSVG />
        </Link>
        <p className='font-sans text-white'>W h e r e I L e f t</p>
      </div>

      <div className="flex flex-row ml-auto gap-4 mx-2">
        <Link to='/auth/signup' className='px-2 py-1 rounded-lg font-mono text-sm text-cyan-400 hover:text-cyan-200'>Signup</Link>
        <Link to='/auth/login' className='px-2 py-1 rounded-lg font-mono text-sm text-cyan-400 hover:text-cyan-200'>Login</Link>
      </div>
    </div>
  )
}

export default SimpleNavbar