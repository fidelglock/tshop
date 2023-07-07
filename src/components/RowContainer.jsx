// incomplete


import React from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'

const RowContainer = ({flag}, {data}) => {
    console.log(data, flag);
  return (
    <div className={`w-full flex items-center my-12 ${flag ? "overflow-x-scroll" : "overflow-x-hidden"}`}>
       {
        data && data.map((item) => (
            <div key={item.id} className='w-300 min-w-[300px] md:w-340 md:min-w-[340px] h-auto bg-cardOverlay shadow-md rounded-xl p-2 backdrop-blur-lg hover:drop-shadow-xl my-12'>
            <div className='w-full flex items-center justify-between'>
                <motion.img whileHover={{scale:1.2}} className='w-40 -mt-8 drop-shadow-2xl' src={item.imageURL}/>
                <motion.div whileTap={{scale:0.75}} className='w-8 h-8 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-lg'>
                    <MdShoppingBasket className='text-white '/>
                </motion.div>
            </div>
            <div className='w-full flex flex-col items-end justify-end'>
                <p className='text-textColor font-semibold text-base md:text-lg'>{item.name}</p>
                <p className='mt-1 text-gray-400 text-md md:text-sm sm:text-xs'>{item.desc}</p>
                <div className='flex items-center gap-8'>
                <p className='text-lg lg:text-md font-semibold text-headingColor'><span className='text-red-600 font-bold'>₹ </span>{item.price}</p>
                </div>
            </div>
        </div>
        ))
       }
    </div>
  )
}

export default RowContainer