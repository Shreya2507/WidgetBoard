import React, { useState, useContext, useRef, useEffect, useCallback } from 'react'
import Widget from '../components/Widget'
import AddWidget from '../components/AddWidget'
import { motion, AnimatePresence } from 'framer-motion'
import { DataContext } from '../context/DataProvider';
import AddCategory from '../components/AddCategory';
import DisplayWidgets from '../components/DisplayWidgets';
import Search from '../components/Search';

function Dashboard() {
  const { data, setData } = useContext(DataContext);
  const [highlightedWidgetId, setHighlightedWidgetId] = useState(null);
  const [scrollToWidgetId, setScrollToWidgetId] = useState(null);

  const widgetRefs = useRef({}); // Stores refs for each widget

  useEffect(() => {
    if (scrollToWidgetId) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        const widgetElement = widgetRefs.current[scrollToWidgetId];
        if (widgetElement) {
          // Use a slightly longer timeout to ensure the widget is rendered
          setTimeout(() => {
            widgetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });

            // Reset the scroll flag after scrolling
            setScrollToWidgetId(null);
          }, 300);
        }
      });
    }
  }, [scrollToWidgetId]);

  const setWidgetRef = useCallback((id) => (el) => {
    if (el) {
      widgetRefs.current[id] = el;
      // console.log(`Ref set for widget ${id}`);
    }
  }, []);

  const handleWidgetHighlight = (id) => {
    setHighlightedWidgetId(id);
    setScrollToWidgetId(id);

    // Auto-remove highlight after 4 seconds
    setTimeout(() => {
      setHighlightedWidgetId(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen px-10 py-5 w-full overflow-y-auto flex flex-col justify-center items-center bg-[#c1d7ff] font-inter-tight text-center">
      <nav className='fixed z-[999] top-0 w-full h-20 flex pl-3 pr-10 py-3 justify-between items-center bg-[#7489bb] shadow-lg'>
        <div className='w-1/4 text-xl text-left font-bold'>CNAPP Dashboard</div>

        <div className='relative w-1/3 h-full flex gap-5 justify-end items-center'>
          <Search setHighlightedWidgetId={handleWidgetHighlight} />
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
              <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
                {/* All widgets */}
                <AnimatePresence>
                  {
                    categoryBlock.widgets.map((widget, widgetIndex) => (
                      widget.visible && (
                        <Widget
                          ref={setWidgetRef(widget.id)} 
                          categoryIndex={index}
                          widgetIndex={widgetIndex}
                          title={widget.title}
                          text={widget.text}
                          isHighlighted={highlightedWidgetId === widget.id}
                          key={widget.id}
                        />
                      )
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