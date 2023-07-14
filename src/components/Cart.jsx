import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import {RiRefreshFill} from 'react-icons/ri'

import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import EmptyCart from "../img/emptyCart.svg"
import CartItem from './CartItem'

const Cart = () => {

    const [tot, setTot] = useState([])
    const [flag, setFlag] = useState([])

    const [{cartShow, cartItems, user}, dispatchEvent] = useStateValue()

    const showCart = () => {
        dispatchEvent({
            type: actionType.SET_CART_SHOW,
            cartShow : !cartShow,
        })
    }

    useEffect(()=> {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price
        }, [tot, flag])
    })

    const clearCart = () => {
        dispatchEvent({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        })
    }

  return (
    <motion.div initial={{opacity : 0, x : 200}} animate={{opacity : 1, x : 0}} exit={{opacity : 0, x : 200}} className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-lg flex flex-col z-[101]'>
        <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
            <motion.div whileTap={{scale : 0.75}} onClick={showCart}>
                <MdOutlineKeyboardBackspace className='text-textColor text-3xl'/>
            </motion.div>
            <p className='text-textColor text-lg font-semibold'>Cart</p>

                <motion.p whileTap={{scale : 0.75}} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-lg cursor-pointer text-textColor text-base'>Clear <RiRefreshFill/></motion.p>
             
        </div>

        {/* bottom section */}
        {cartItems && cartItems.length > 0 ? (
            <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
            
            
                {/* cart items section */}
                <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none '>
                    {/* cart item */}
                    {
                        cartItems && cartItems.map(item => (
                    <CartItem key={item.id} item={item}/>
                        ))
                    }
    
                </div>
    
    
                {/* cart total section */}
                <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-400 text-lg'>Sub Total</p>
                        <p className='text-gray-400 text-lg'><span className='mr-1 text-lg font-semibold'>₹</span>140</p>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-400 text-sm'>Discount</p>
                        <p className='text-gray-400 text-sm'><span className='mr-1 text-lg font-semibold'>₹</span>20</p>
                    </div>
    
                    {/* divider */}
                    <div className='w-full border-b border-gray-600 my-2'></div>
    
    
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-400 text-xl font-semibold'>Total</p>
                        <p className='text-gray-400 text-xl font-semibold'><span className='mr-1 text-lg font-semibold'>₹</span>120</p>
                    </div>
    
                    {
                        user ? (
                            <motion.button whileTap={{scale:0.8}} className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out'>
                                Checkout
                            </motion.button>
                        ) : (
                            <motion.button whileTap={{scale:0.8}} className='w-full p-2 rounded-full bg-gradient-to-tr from-gray-400 to-gray-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out'>
                                Login to order food
                            </motion.button>
                        )
                    }
                </div>
            </div>
        ): (
            <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
                <img src={EmptyCart} className='w-300' />
                <p className='text-xl text-textColor font-semibold'>
                    Add items to your cart
                </p>

            </div>
        )}

        

    </motion.div>
  )
}

export default Cart