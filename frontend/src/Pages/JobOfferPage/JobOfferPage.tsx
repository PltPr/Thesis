import React from "react";
import CardList from "../../Modules/CardList/CardList";
import { useAuth } from "Context/useAuth";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const JobOfferPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white">
      <div className="flex max-w-7xl mx-auto pt-10 pb-20 px-6 gap-6">

        {/* SIDEBAR */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="w-64 bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-4 border border-blue-200"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>

          <p className="text-gray-500 text-sm">Coming soon...</p>
        </motion.div>

        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex-1 bg-white rounded-2xl shadow-xl p-6 border border-blue-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Job Offers
          </h2>
          <CardList />
        </motion.div>
      </div>
    </div>
  );
};

export default JobOfferPage;
