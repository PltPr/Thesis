import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { JobOfferGet } from "../../Models/JobOffers";
import { getJobOffersApi } from "../../Api/JobOfferServices";
import { motion } from "framer-motion";

const CardList: React.FC = () => {
  const [jobOffer, setJobOffer] = useState<JobOfferGet[]>([]);

  useEffect(() => {
    const getData = async () => {
      const value = await getJobOffersApi();
      if (value) setJobOffer(value);
    };
    getData();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {jobOffer.map((offer) => (
        <motion.div
          key={offer.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card jobOffer={offer} />
        </motion.div>
      ))}
    </div>
  );
};

export default CardList;
