import React, { useState, useEffect, useContext, useRef } from 'react'
import Widget from '../components/Widget'
import AddWidget from '../components/AddWidget'
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion'
import { DataContext } from '../context/DataProvider';
import AddCategory from '../components/AddCategory';
import DisplayWidgets from '../components/DisplayWidgets';
import Search from '../components/Search';

function Dashboard() {
  const { data, setData } = useContext(DataContext);
  const [highlightedWidgetId, setHighlightedWidgetId] = useState(null);

  const widgetRefs = useRef({}); // Stores refs for each widget

  const scrollToWidget = (id) => {
    const widgetElement = widgetRefs.current[id];
    if (widgetElement) {
      widgetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen px-10 py-5 w-full overflow-y-auto flex flex-col justify-center items-center bg-gradient-to-b from-[#7674bb] to-[#b6b3fe] font-inter-tight text-center">
      <nav className='fixed z-[999] top-0 w-full h-20 flex pl-3 pr-10 py-3 justify-between items-center bg-[#7674bb] shadow-lg'>
        <div className='w-1/4 text-xl text-left font-bold'>CNAPP Dashboard</div>

        <div className='relative w-1/3 h-full flex gap-5 justify-end items-center'>
          <Search setHighlightedWidgetId={(id) => {
            setHighlightedWidgetId(id);
            scrollToWidget(id);
            setTimeout(() => setHighlightedWidgetId(null), 3000);
          }} />
        </div>

        <div className='w-1/4 h-5/6 flex gap-4'>
          <AddCategory />
          <DisplayWidgets />
        </div>
      </nav>


      {/* BOARD */}
      <div className='w-full h-auto mt-20'>
        {
          data?.map((categoryBlock, index) => (
            // BLOCK
            <div key={index} className='mb-6 flex flex-col gap-2 justify-start items-start'>
              <div className='text-lg font-semibold'>{categoryBlock.category}</div>
              <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {/* All widgets */}
                <AnimatePresence>
                  {
                    categoryBlock.widgets.map((widget, widgetIndex) => (
                      widget.visible && (<Widget ref={el => widgetRefs.current[widget.id] = el} categoryIndex={index} widgetIndex={widgetIndex} title={widget.title} text={widget.text} isHighlighted={highlightedWidgetId === widget.id} key={widget.id} />)
                    ))
                  }
                </AnimatePresence>
                <AddWidget categoryIndex={index} />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard
