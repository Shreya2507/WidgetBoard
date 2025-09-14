import React, { useEffect, useContext, useState } from 'react'
import { DataContext } from '../context/DataProvider';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion'
import { IoIosCloseCircleOutline } from "react-icons/io";

function DisplayWidgets() {
    const { data, setData } = useContext(DataContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categorySelected, setCategorySelected] = useState(0);

    useEffect(() => {
        if (data && data.length > 0) {
            const visibility = data.map(category =>
                category.widgets.map(widget => ({
                    id: widget.id,
                    visible: widget.visible
                }))
            );
            setLocalVisibility(visibility);
        }
    }, [data]);

    const [localVisibility, setLocalVisibility] = useState(() =>
        data.map(category =>
            category.widgets.map(widget => ({
                id: widget.id,
                visible: widget.visible
            }))
        )
    );

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    const confirmSelection = (event) => {
        event.preventDefault();
        setData(prevData => {
            return prevData.map((category, categoryIndex) => ({
                ...category,
                widgets: category.widgets.map((widget, widgetIndex) => ({
                    ...widget,
                    visible: localVisibility[categoryIndex][widgetIndex].visible
                }))
            }));
        });

        closeModal();
    };

    const categoryClicked = (categoryIndex) => {
        setCategorySelected(categoryIndex);
    }

    return (
        <>
            <motion.button onClick={openModal} whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }} type='button' className='w-1/2 py-2 bg-white rounded-md capitalize text-sm md:text-md'>Add widgets</motion.button>

            {/* MODAL TO ADD WIDGETS */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="bg-white w-full sm:w-1/2 h-full shadow-lg py-4 px-4 relative"
                        >
                            {/* Close Button */}
                            <motion.div onClick={closeModal} whileHover={{ scale: 1.08, color: '#f00' }}
                                whileTap={{ scale: 0.95 }} className='absolute z-[5] top-2 right-2 w-8 h-8'><IoIosCloseCircleOutline className='w-full h-full cursor-pointer' /></motion.div>


                            {/* Modal Content */}
                            <div className="h-full w-full flex flex-col gap-4">
                                <div className='text-2xl font-semibold capitalize'>Choose which widgets to display</div>
                                <div className='flex flex-col justify-between gap-3 items-end w-full h-full'>
                                    <div className='flex flex-col w-full h-full'>
                                        <div className='h-12 w-full flex items-start justify-start text-md overflow-y-auto'>
                                            {data.map((categoryBlock, categoryIndex) => (
                                                <button onClick={() => categoryClicked(categoryIndex)} key={categoryIndex} className={` ${categorySelected === categoryIndex ? 'border-b-[2.5px] border-b-[#2c296f] bg-slate-200' : 'border-b-[2.5px] border-b-slate-300'} hover:bg-slate-200 ${(categoryIndex !== data.map.length + 1) ? 'border-r-[2px]' : ''}  border-slate-200 h-full px-3 flex justify-center items-center transition-all ease-in-out`}>{categoryBlock.category}</button>
                                            ))}
                                        </div>
                                        <div className=' h-full w-full p-3 flex flex-col justify-start gap-2 items-start overflow-y-auto'>
                                            {
                                                data[categorySelected]?.widgets.map((widget, widgetIndex) => (
                                                    <label key={widget.id} className="flex items-center cursor-pointer gap-2 py-3 w-full text-sm border-2 border-slate-200 rounded-md px-5">
                                                        <input
                                                            className='cursor-pointer'
                                                            type="checkbox"
                                                            checked={localVisibility[categorySelected]?.[widgetIndex]?.visible}
                                                            onChange={() => {
                                                                const newVisibility = [...localVisibility];
                                                                newVisibility[categorySelected][widgetIndex].visible = !newVisibility[categorySelected][widgetIndex].visible;
                                                                setLocalVisibility(newVisibility);
                                                            }}
                                                        />
                                                        {widget.title}
                                                    </label>
                                                ))
                                            }
                                        </div>




                                        {/* <div className='bg-green-300 h-12 w-full flex items-start justify-start text-md'>
                                            <div onClick={categorySelected} className={` ${false ? 'border-b-[3px] border-b-[#2c296f]' : 'border-b-[3px] border-b-slate-300'} bg-green-300 h-full px-3 flex justify-center items-center`}>CISP</div>
                                            
                                        </div> */}
                                        {/* <div className='bg-green-600 h-full w-full text-sm'>f</div> */}
                                    </div>
                                    <div className=' w-2/3 h-9'>
                                        <button type='button' onClick={closeModal} className='w-5/12 mr-3 h-full bg-white font-semibold rounded-lg text-[#2c296f] border-2 border-[#2c296f]'>Cancel</button>
                                        <button type='submit' onClick={confirmSelection} className='w-5/12 h-full text-white font-semibold rounded-lg bg-[#2c296f] '>Confirm</button>
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>

    )
}

export default DisplayWidgets
