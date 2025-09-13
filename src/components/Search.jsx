import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DataContext } from '../context/DataProvider';

function Search({ setHighlightedWidgetId }) {
    const { data } = useContext(DataContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearchChange = (e) => {
        e.preventDefault();
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length > 0) {
            setIsModalOpen(true);

            const results = [];
            data.forEach((category, catIdx) => {
                category.widgets.forEach((widget, widgetIdx) => {
                    if (widget.title.toLowerCase().includes(query.toLowerCase())) {
                        results.push({
                            ...widget,
                            categoryIndex: catIdx,
                            widgetIndex: widgetIdx,
                        });
                    }
                });
            });

            setSearchResults(results);
        } else {
            setIsModalOpen(false);
            setSearchResults([]);
        }
    };

    return (
        <>
            <div className="relative w-full h-full">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for a widget"
                    className="w-full h-5/6 rounded-md p-3 text-md pr-12 outline-none focus:border-[#2c296f] focus:border-2"
                />
                <button type="submit" className="absolute z-[5] right-3 bottom-1/5">
                    <svg className="w-6 h-6" /* Insert your search icon here */></svg>
                </button>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-start pt-20"
                    >
                        <motion.div className="bg-white w-1/2 h-full rounded-lg p-5 shadow-lg max-h-[70vh] overflow-y-auto">
                            {searchResults.length === 0 ? (
                                <div>No widgets found.</div>
                            ) : (
                                searchResults.map(result => (
                                    <div
                                        key={result.id}
                                        className="p-3 border-b cursor-pointer hover:bg-slate-100 flex justify-between items-center"
                                        onClick={() => {
                                            setHighlightedWidgetId(result.id);
                                            setIsModalOpen(false);
                                            setSearchQuery("");
                                        }}
                                    >
                                        <span>{result.title}</span>
                                        {!result.visible && <span className="text-xs text-red-500 font-semibold">Not in dashboard</span>}
                                    </div>
                                ))
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Search;
