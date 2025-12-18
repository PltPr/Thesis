import React, { useState } from "react";
import CardList from "../../Modules/CardList/CardList";
import { useAuth } from "Context/useAuth";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const JobOfferPage = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [language, setLanguage] = useState("");


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

           <input
            type="text"
            placeholder="Search job title..."
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="
              mb-5
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-gray-700
              placeholder-gray-400
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-300
              focus:outline-none
              transition
              duration-200
              ease-in-out
            "
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-gray-700
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-300
              focus:outline-none
              transition
              duration-200
              ease-in-out
            "
          >
            <option value="" disabled>
              Language
            </option>
            <option value="">All</option>
            <option value="Cpp">C++</option>
            <option value="C#">C#</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
          </select>
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
          <CardList JobTitleQuery={jobTitle} ProgrammingLanguage={language}/>
        </motion.div>
      </div>
    </div>
  );
};

export default JobOfferPage;
