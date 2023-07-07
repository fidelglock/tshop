import React, { useEffect, useRef, useState } from 'react'
import HomeContainer from './HomeContainer'
import { motion } from 'framer-motion'
import {MdChevronLeft, MdChevronRight} from "react-icons/md"
import RowContainer from './RowContainer'
import MenuContainer from './MenuContainer'
import { useStateValue } from '../context/StateProvider'
import Menu from './Menu'
import Cart from './Cart'


const MainContainer = () => {

const [{item, cartShow}, dispatchEvent] = useStateValue();
const [scrollValue, setScrollValue] = useState(0)

const menuConRef = useRef()


useEffect(() => {}, [scrollValue, cartShow])

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
        <HomeContainer/>

        <section className="w-full my-6">
          <div className='w-full flex items-center justify-between'>
            <p className='text-2xl font-semibold uppercase text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100'>AllItems</p>

            <div className='hidden md:flex gap-3 items-center'>
              <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg'><MdChevronLeft className='text-lg text-base'/></motion.div>
              <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg'><MdChevronRight className='text-lg text-base'/></motion.div>

            </div>
          </div>
          {/* <RowContainer flag={true} data={item ?.filter(n=> n.category === 'snacks')}/> */}
          <MenuContainer data={item}/>
          {cartShow && (
            <Cart/>
          )}
        </section>

    </div>
  )
}

export default MainContainer