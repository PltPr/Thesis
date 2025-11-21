// src/pages/UserPage.tsx
import React from "react";
import { useAuth } from "Context/useAuth";
import { UserProfile } from "Models/User"; 
import { motion } from "framer-motion";

type Props = {};

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

const UserPage: React.FC<Props> = () => {
  const { user } = useAuth() ?? {}; // jeśli brak useAuth, usuń i podaj dane ręcznie

  // fallback (jeśli useAuth nie jest zainicjalizowane)
  const profile: Partial<UserProfile> = user ?? {
    name: "Jan",
    surname: "Kowalski",
    email: "jan.kowalski@example.com",
    phoneNumber: "+48 600 000 000",
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white rounded-2xl border border-blue-200 shadow-xl p-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              {profile.name?.[0] ?? "U"}
              {profile.surname?.[0] ?? ""}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.name} {profile.surname}
              </h1>
            </div>

            <div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition">
                Edytuj profil
              </button>
            </div>
          </div>

          {/* Sekcje z detalami */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-xs text-gray-500">E-mail</h3>
              <p className="font-medium text-gray-800 mt-1">{profile.email}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-xs text-gray-500">Telefon</h3>
              <p className="font-medium text-gray-800 mt-1">{profile.phoneNumber}</p>
            </div>

            <div className="sm:col-span-2 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-xs text-gray-500">O mnie</h3>
              <p className="text-gray-700 mt-2">
                {/* Tu możesz wstawić pole editable lub bio z backendu */}
                Krótkie podsumowanie użytkownika / stanowisko / lokalizacja.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserPage;
