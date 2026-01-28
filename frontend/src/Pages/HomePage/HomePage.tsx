import React from 'react';
import { useAuth } from 'Context/useAuth';
import { FileText, CheckCircle, Code, Trophy, Paperclip, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';  

const HomePage = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  var token = localStorage.getItem("token");
  console.log(token)

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white">

      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* HERO SECTION */}
        <motion.section
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Witaj w <span className="text-blue-600">iTrack</span>
          </h1>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
            Nowoczesna platforma rekrutacyjna, która pozwala na szybkie i efektywne ocenianie umiejętności programistów
            dzięki testom technicznym i precyzyjnej analizie CV.
          </p>
        </motion.section>

        {/* TIMELINE - Proces rekrutacji */}
        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">Jak wygląda proces rekrutacji?</h2>
          
          
        </motion.section>

        {/* INTERACTIVE CARDS */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
        >
          <motion.div
            className="card card-compact bg-white shadow-xl transition-all hover:shadow-2xl transform hover:scale-105 duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="card-body text-center">
              <FileText className="w-12 h-12 mx-auto text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Wyślij swoje CV</h3>
              <p className="text-gray-600">Aplikuj na dostępne stanowiska programistyczne.</p>
            </div>
          </motion.div>

          <motion.div
            className="card card-compact bg-white shadow-xl transition-all hover:shadow-2xl transform hover:scale-105 duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="card-body text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Zostaniesz oceniony</h3>
              <p className="text-gray-600">Egzaminator przeanalizuje Twoje CV i przydzieli test.</p>
            </div>
          </motion.div>

          <motion.div
            className="card card-compact bg-white shadow-xl transition-all hover:shadow-2xl transform hover:scale-105 duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="card-body text-center">
              <Code className="w-12 h-12 mx-auto text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Test Techniczny</h3>
              <p className="text-gray-600">Wykonaj test techniczny w zależności od wymagań stanowiska.</p>
            </div>
          </motion.div>

          <motion.div
            className="card card-compact bg-white shadow-xl transition-all hover:shadow-2xl transform hover:scale-105 duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="card-body text-center">
              <Trophy className="w-12 h-12 mx-auto text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Zdobądź Pracę</h3>
              <p className="text-gray-600">Jeżeli wpasowywujesz się w stanowisko - dostaniesz prace!</p>
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  )
}

export default HomePage;