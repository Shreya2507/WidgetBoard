import React, { useEffect, useContext, useState } from 'react'
import { DataContext } from '../context/DataProvider';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosCloseCircleOutline } from "react-icons/io";

function AddCategory() {
    const { data, setData } = useContext(DataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const submit = (event) => {
        event.preventDefault();
        setData(prevData => {
            const newData = [...prevData, {
                "category": title,
                "widgets": []
            }];

            return newData;
        });
    }

    return (
        <>
            <motion.button onClick={openModal} whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }} type='button' className='w-1/2 py-2 bg-white rounded-md capitalize text-sm md:text-md'>Add category</motion.button>

            {/* MODAL TO ADD A CATEGORY */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="bg-white w-full sm:w-96 h-full shadow-lg py-6 px-4 relative"
                        >
                            {/* Close Button */}
                            <motion.div onClick={closeModal} whileHover={{ scale: 1.08, color: '#f00' }}
                                whileTap={{ scale: 0.95 }} className='absolute z-[5] top-5 right-5 w-8 h-8'><IoIosCloseCircleOutline className='w-full h-full cursor-pointer' /></motion.div>


                            {/* Modal Content */}
                            <div className="h-full w-full flex flex-col gap-4 py-5">
                                <div className='text-2xl font-semibold'>Add New Category</div>
                                <form onSubmit={submit} className='flex flex-col justify-between items-end w-full h-full'>
                                    <div className='flex flex-col w-full h-1/3'>
                                        <div className='w-full h-full p-2 flex flex-col justify-center items-start gap-1 '>
                                            <div>Category Name</div>
                                            <input className='w-full h-14 rounded-lg px-4 outline-none focus:border-[#2c296f] border-black border-2' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter name' />
                                        </div>
                                    </div>
                                    <div className=' w-2/3 h-9 '>
                                        <button type='button' onClick={closeModal} className='w-5/12 mr-3 h-full bg-white font-semibold rounded-lg text-[#2c296f] border-2 border-[#2c296f]'>Cancel</button>
                                        <button type='submit' onClick={closeModal} className='w-5/12 h-full text-white font-semibold rounded-lg bg-[#2c296f] '>Confirm</button>
                                    </div>
                                </form>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default AddCategory
