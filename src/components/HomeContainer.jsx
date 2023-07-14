import React from 'react'
import Hawaita from "../img/hawaita.png"
import HeroBg from "../img/heroBg.png"
import { heroData } from '../utils/data'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
// import Sw1 from "../img/sw1.png"

// const heroData = [
    
//         {id: 1, name: 'Black Tea', desc:'Darjeeling tea orthodox flavor', price:10},
//         {id: 2, name: 'Grilled Sandwich', desc:'Butter toasted bread, cheese and mayo', price:30},
//         {id: 3, name: 'Veg Pops', desc:'Deep fried coated vegetable chunks', price:40}
// ]

const HomeContainer = ({data}) => {
  return (
    <section id="home" className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-screen'>
        <div className=' py-2 flex-1 flex flex-col items-start justify-center gap-6'>
            <div className='px-4 py-1 flex items-center gap-2 justify-center bg-orange-100 p-2 rounded-2xl'>
                <p className='text-base text-orange-500 font-semibold'>Hawaita</p>
                <div className='w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl'>
                    <img src={Hawaita} alt="hawaita" className='w-full h-full object-contain'/>
                </div>
                <Link to={'/createItem'}>
                    <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'><MdAdd/>New Item</p>
                </Link>
            </div>
            <p className='text-[2.5rem] md:text-[4.35rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>
                The best Tea and <span className='text-orange-600 text-[3rem] md:text-[5rem] lg:text-[5.5rem]'>Snacks</span> freshly cooked
            </p>
            <p className='text-base text-textColor text-justified md:text-left md:w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ad assumenda voluptatum. Eaque, necessitatibus nihil voluptatibus exercitationem excepturi asperiores ratione voluptates, ex fugiat totam assumenda incidunt, placeat pariatur commodi aut!</p>
            <button type='button' className='md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 bg-gradient-to-br from-orange-400 to-orange-500 w-full'>Order Now</button>
        
        </div>
        <div className='py-2 flex-1 flex items-center relative'>
            <img src={HeroBg} alt='herobg' className='ml-auto h-420 w-full lg:w-auto lg:h-650' />
            <div className='gap-4 flex-wrap w-full h-full absolute flex items-center justify-center top-0 left-0 px-16 lgpx-32 py-4'>
                {
                    data && data.map(item=>(
                <motion.div whileHover={{scale:1.25}} key={item.id} className='drop-shadow-lg lg:w-190 p-3 bg-cardOverlay backdrop-blur-md rounded-2xl flex flex-col items-center justify-center'>
                    <img src={item.imageURL} alt='sandwich' className='md:w-30 w-25 lg:w-40 -mt-7 lg:-mt-18' />
                    <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>{item.name}</p>
                    <p className='text-xs text-gray-500 font-light text-center text-lighttextGray lg:my-3 my-1'>{item.desc} </p>
                    <p className='text-[12px] lg:text-md font-semibold text-headingColor'><span className='text-red-600 font-bold'>₹ </span>{item.price}</p>
                </motion.div>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default HomeContainer 