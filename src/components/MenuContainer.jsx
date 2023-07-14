import React, { useEffect, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const MenuContainer = ({data}) => {

    const [items, setItems] = useState([])

const[{cartItems}, dispatchEvent] = useStateValue()

const addToCart = () => {
    
    //console.log(item)
    dispatchEvent({
        type:actionType.SET_CART_ITEMS,
        cartItems:items
    });
    localStorage.setItem("cartItems", JSON.stringify(items))
}

useEffect(()=> {
    addToCart()
}, [items])

  return (
    <div className='w-full my-6 flex items-center overflow-x-scroll scrollbar-none' id='menu'>
        {
            data && data.map(item => (
                <motion.div whileTap={{scale:1.25}} key={item.id} className='w-full flex flex-col flex-wrap items-center justify-center'>
                    <div className='drop-shadow-lg lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-2xl flex flex-col items-center justify-center'>
                        <img src={item.imageURL} />
                        <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>{item.name}</p>
                        <p className='text-xs text-gray-500 font-light text-center text-lighttextGray lg:my-3 my-1'>{item.desc} </p>
                        <p className='text-[12px] lg:text-md font-semibold text-headingColor'><span className='text-red-600 font-bold'>₹ </span>{item.price}</p>
                    
                        <div className='flex items-end mt-4'>
                            <motion.div onClick={()=>setItems([...cartItems, item])} whileTap={{scale:0.75}} className='w-7 h-7 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:shadow-lg'>
                                    <MdShoppingBasket className='text-white '/>
                            </motion.div>
                        </div>
                    
                    </div>
                </motion.div>
            ))
        }
          

    </div>
  )
}

export default MenuContainer