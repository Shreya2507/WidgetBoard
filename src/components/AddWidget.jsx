import React, { useState, useContext } from 'react'
import { FaPlus } from "react-icons/fa6";
import { AnimatePresence, motion } from 'framer-motion'
import { DataContext } from '../context/DataProvider';
import { v4 as uuidv4 } from 'uuid';
import { IoIosCloseCircleOutline } from "react-icons/io";

function AddWidget({ categoryIndex }) {
  const { data, setData } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const addWidget = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const submit = (event) => {
    event.preventDefault();

    const newWidget = {
      id: uuidv4(), // Unique ID
      "title": title,
      "text": text,
      "visible": true
    };
    setData(prevData => {
      const newData = [...prevData]; // shallow copy of the array

      newData[categoryIndex] = {
        ...newData[categoryIndex], // copy the category object
        widgets: [...newData[categoryIndex].widgets, newWidget] // new widgets array with the new widget
      };

      return newData;
    });

    setTitle("");
    setText("");

  }

  return (
    <>
      <motion.div onClick={addWidget} whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }} className='x-10 cursor-pointer w-full h-64 p-5 flex justify-center items-center text-slate-400 bg-white rounded-2xl shadow-lg'>
        <div className=' w-fit flex rounded-md border-[1px] border-slate-400 justify-center items-center py-2 px-5 cursor-pointer '>
          <FaPlus className='w-5 h-5 mr-3' />
          <div className=' capitalize text-lg'>Add widget</div>
        </div>
      </motion.div>


      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white w-1/3 h-full shadow-lg py-6 px-4 relative"
            >
              {/* Close Button */}
              <motion.div onClick={closeModal} whileHover={{ scale: 1.08, color: '#f00' }}
                      whileTap={{ scale: 0.95 }} className='absolute z-[5] top-5 right-5 w-8 h-8'><IoIosCloseCircleOutline className='w-full h-full cursor-pointer' /></motion.div>
              

              {/* Modal Content */}
              <div className="h-full w-full flex flex-col gap-4 py-5">
                <div className='text-2xl font-semibold'>Add New Widget</div>
                <form onSubmit={submit} className='flex flex-col justify-between items-end w-full h-full mt-7'>
                  <div className='flex flex-col w-full h-fit gap-5'>
                    <div className='w-full h-full p-2 flex flex-col justify-center items-start '>
                      <div>Widget Name</div>
                      <input className='w-full h-14 rounded-lg px-4 outline-none focus:border-[#2c296f] border-black border-2' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter name' />
                    </div>
                    <div className='w-full h-full p-2 flex flex-col justify-center items-start '>
                      <div>Widget Text</div>
                      <input className='w-full h-14 rounded-lg px-4 outline-none focus:border-[#2c296f] border-black border-2' type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter text' />
                    </div>
                  </div>
                  <div className=' w-2/3 h-9 '>
                    <button type='button' onClick={closeModal} className='w-5/12 mr-3 h-full bg-white font-semibold rounded-lg text-[#2c296f] border-2 border-[#2c296f]'>Cancel</button>
                    <button type='submit' onClick={closeModal} className='w-5/12 h-full text-white font-semibold rounded-lg bg-[#2c296f]'>Confirm</button>
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

export default AddWidget
