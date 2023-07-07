import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {MdFastfood, MdOutlineFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdOutlineFoodBank, MdCurrencyRupee} from 'react-icons/md'
import Loader from './Loader'
import { categories } from '../utils/data'

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase.config'
import { getAllItems, saveItem } from '../utils/firebaseFunctions'
import { actionType } from '../context/reducer'
import { useStateValue } from '../context/StateProvider'

const CreateContainer = () => {

const [name, setName] = useState("")
const [category, setCategory] = useState("")
const [desc, setDesc] = useState("")
const [price, setPrice] = useState("")

const [imageAsset, setImageAsset] = useState(null)

const [fields, setFields] = useState(false) //for validation
const [alertStatus, setAlertStatus] = useState("danger")
const [message, setMessage] = useState(null)
const [isLoading, setIsLoading] = useState(false)

const [{item}, dispatchEvent] = useStateValue();

const fetchData = async () => {
  await getAllItems().then((data) => {
    // console.log(data);
    dispatchEvent({
      type: actionType.SET_ITEM,
      item : data,
  })
  })
}

const uploadImage = (e) => {
  setIsLoading(true)
  const imageFile = e.target.files[0];
  // console.log(imageFile)
  const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
  const uploadTask = uploadBytesResumable(storageRef, imageFile)
  uploadTask.on('state_changed', (snapshot) => {
                                                  const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
                                                }, (error) => {
                                                                console.log(error);
                                                                setFields(true)
                                                                setMessage('Error while uploading. Try again')
                                                                setAlertStatus('danger')
                                                                setTimeout(()=>{
                                                                  setFields(false)
                                                                  setIsLoading(false)
                                                                }, 4000)
                                                              }, ()=>{
                                                                        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                                                                          setImageAsset(downloadURL)
                                                                          setIsLoading(false)
                                                                          setFields(true)
                                                                          setMessage('Image has been uploaded successfully !')
                                                                          setAlertStatus('success')
                                                                          setTimeout(() => {
                                                                            setFields(false)
                                                                          }, 4000)
                                                                        })
                                                                      })


}

const deleteImage = () => {
  setIsLoading(true)
  const deleteRef = ref(storage, imageAsset)
  deleteObject(deleteRef).then(()=> {
    setImageAsset(null)
    setIsLoading(false)
    setFields(true)
    setMessage('Image has been deleted successfully !')
    setAlertStatus('success')
    setTimeout(() => {
    setFields(false)
    }, 4000)
  })
}

const saveDetails = () => {
  setIsLoading(true);
  try{
    if((!name || !desc || !imageAsset || !price || !category)) {
    
    setFields(true)
    setMessage('Required fields cannot be empty... Try again')
    setAlertStatus('danger')
    setTimeout(()=>{
    setFields(false)
    setIsLoading(false)
    }, 4000)
    } else {
      const data = {
        id : `${Date.now()}`,
        name: name,
        category: category,
        desc: desc,
        imageURL : imageAsset,
        price: price,
        qty: 1
      }
      saveItem(data)
      setIsLoading(false)
      setFields(true)
      setMessage('Data has been successfully posted to Firebase !')
      clearData()
      setAlertStatus('success')
      setTimeout(() => {
      setFields(false)
      
        }, 4000)
      }

  } catch (error){
    console.log(error);
    setFields(true)
    setMessage('Error while posting data... Try again')
    setAlertStatus('danger')
    setTimeout(()=>{
    setFields(false)
    setIsLoading(false)
    }, 4000)
  }
  fetchData();
}


const clearData = () => {
  setName("")
  setCategory("")
  setDesc("")
  setImageAsset(null)
  setPrice("")

}


  return (
    <div className='w-full min-h-screen h-auto p-4 flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center'>
        

        <div className='w-45 py-2 border-b-2 border-gray-300 flex items-center gap-2'>
          <MdOutlineFastfood className="text-xl text-gray-700" />
          <input type="text" required value={name} onChange={(e)=>setName(e.target.value)} placeholder='Item name' className='w-full h-full text-lg bg-transparent text-textColor placeholder:text-gray-400'/>
        </div>

        <div className='w-full mt-2'>
          <select onChange={(e)=> setCategory(e.target.value)} className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
            <option value="other" className='bg-white text-textColor text-sm' >Select Category</option>
            {categories && categories.map(item => (
              <option key={item.id} className='text-base border-0 outline-none capitalize bg-white text-headingColor' value={item.urlParamName}>{item.name}</option>
            ))}
          </select>

        </div>

        <div className='mt-4 group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
            {isLoading ? <Loader/> : (<>
                                        {
                                          !imageAsset ? (<>
                                                          <label className='w-full h-full flex flex-col items-center justify-center'>
                                                            <div className='gap-2 w-full h-full flex flex-col items-center justify-center'>
                                                              <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700'/>
                                                              <p className='text-gray-500 hover:text-gray-700'>Upload</p>
                                                            </div>
                                                            <input type='file' name='uploadImage' accept='image/' onChange={uploadImage} className='w-0 h-0'/>
                                                          </label>
                                                        </>) : (<>
                                                                    <div className='relative h-full'>
                                                                      <img src={imageAsset} alt='uploadedImage' className='w-full h-full object-cover'/>
                                                                      <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out' onClick={deleteImage}>
                                                                        <MdDelete className='text-white'/>
                                                                      </button>
                                                                    </div>
                                                                </>
                                        )}
                                    </>)}
        </div>

        {/* <div className='w-full flex flex-col md:flex-row items-center gap-3'>
            <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                <MdOutlineFoodBank className='text-gray-700 text-2xl'/>
                <input type='text' required placeholder='Short desc' className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"/>
            </div>                                                
        </div> */}
        <div className='w-full flex flex-col md:flex-row items-center gap-3 mt-3'>
            <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                {/* <MdOutlineFoodBank className='text-gray-700 text-2xl'/> */}
                <textarea type='text' required placeholder='Short description' className="w-full h-full text-sm bg-transparent outline-none border-slate-200 placeholder:text-gray-400 placeholder:text-base text-textColor" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            </div>                                                
        </div>
        <div className='w-full flex flex-col md:flex-row items-center gap-3 mt4'>
            <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                <MdCurrencyRupee className='text-gray-700 text-2xl'/>
                <input type='text' required placeholder='Price' className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </div>                                                
        </div>
        <div className='flex items-center w-full mt-4'>
            <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={saveDetails}>
              Add Item
            </button>
        </div>
        {
          fields && (
            <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className={`w-full p-2 rounded-lg text-center text-lg font-semibold mt-3 ${alertStatus==='danger' ? 'bg-red-400 text-red-800':'bg-emerald-400 text-emerald-800'}`}>
              {message}
            </motion.p>
          )
        }
      </div>
    </div>
  )
}

export default CreateContainer