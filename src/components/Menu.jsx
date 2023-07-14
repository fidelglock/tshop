import React from 'react'
import { MdChevronLeft, MdChevronRight, MdFastfood } from 'react-icons/md'
import { motion } from 'framer-motion'
import {IoFastFood} from 'react-icons/io'

const Menu = () => {
  return (
    <section className='w-full my-6' id="menu">
        <div className='w-full flex items-center justify-between'>
            <p className='text-2xl font-semibold uppercase text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto'>All Items</p>

            <div className='hidden md:flex gap-3 items-center'>
              <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg'><MdChevronLeft className='text-lg text-base'/></motion.div>
              <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg'><MdChevronRight className='text-lg text-base'/></motion.div>

            </div>
        </div>
        <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
            <div className='hover:bg-orange-600 ease-in-out group bg-gray-100 w-24 min-w-[94px h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center duration-150 transition-all'>
                <div className='w-10 h-10 rounded-full bg-orange-600 group-hover:bg-white flex items-center justify-center'>
                    <MdFastfood className='text-gray-100 group-hover:text-textColor' />
                </div>
            </div>
        </div>
    
    </section>
  )
}

export default Menu