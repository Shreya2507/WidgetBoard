import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const goToDashboard = () => {
    navigate("/dashboard");
  }
  return (
    <div className="h-screen w-screen flex flex-col gap-8 justify-center items-center bg-gradient-to-b from-white to-[#b3cdfe] font-inter-tight px-4 text-center">
      
      <motion.h1
        className="font-bold uppercase text-5xl md:text-6xl text-[#27227d]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to WidgetBoard
      </motion.h1>
      
      <motion.button
      onClick={goToDashboard}
        whileHover={{ scale: 1.05, backgroundColor: '#27227d', color: '#fff' }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-4 font-semibold rounded-2xl text-xl border-2 border-[#27227d] transition-colors duration-0"
      >
        Go to Dashboard
      </motion.button>
      
    </div>
  );
}

export default Home;
