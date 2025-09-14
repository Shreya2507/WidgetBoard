import React, { useContext, forwardRef } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from 'framer-motion'
import { DataContext } from '../context/DataProvider';

const Widget = forwardRef(({ categoryIndex, widgetIndex, title, text, isHighlighted }, ref) => {
  const { data, setData } = useContext(DataContext);

  const removeWidget = () => {
    setData(prevData => {
      const newData = [...prevData]; // shallow copy of the array

      newData[categoryIndex] = {
        ...newData[categoryIndex], // copy the category object
        widgets: newData[categoryIndex].widgets.filter((_, index) => index !== widgetIndex)
      };

      return newData;
    });
  };

  return (
    <motion.div
      ref={ref} // Add this line to forward the ref
      initial={{ opacity: 0, y: -20 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
      animate={isHighlighted ? {
        boxShadow: [
          '0 0 0px rgba(253,224,71,0.8)',
          '0 0 20px rgba(253,224,71,1)',
          '0 0 0px rgba(253,224,71,0.8)'
        ],
        opacity: 1, y: 0
      } : { opacity: 1, y: 0 }}
      transition={isHighlighted ? { duration: 1, repeat: Infinity, repeatType: 'loop' } : {}}
      className={`z-0 relative w-full h-64 p-5 flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg`}
    >
      <motion.div 
        onClick={removeWidget} 
        whileHover={{ scale: 1.08, color: '#f00' }}
        whileTap={{ scale: 0.95 }} 
        className='absolute z-[5] top-3 right-5 w-6 h-6'
      >
        <IoIosCloseCircleOutline className='w-full h-full cursor-pointer' />
      </motion.div>
      <div className=' border-b-[1.5px] w-full pb-1 mb-2 border-slate-300 font-semibold text-lg'>{title}</div>
      <div className='text-md'>{text}</div>
    </motion.div>
  )
});

export default Widget