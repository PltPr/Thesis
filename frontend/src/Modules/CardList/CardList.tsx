import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { JobOfferGet, JobOfferQuery } from "../../Models/JobOffers";
import { getJobOffersApi } from "../../Api/JobOfferServices";
import { motion } from "framer-motion";

interface Props{
  JobTitleQuery:string;
  ProgrammingLanguage:string
}

const CardList: React.FC<Props> = ({JobTitleQuery,ProgrammingLanguage}) => {
  const [jobOffer, setJobOffer] = useState<JobOfferGet[] | null>(null);

  useEffect(() => {
    const getData = async () => {

    const query:JobOfferQuery={
      jobTitle:JobTitleQuery || undefined,
      language:ProgrammingLanguage ||undefined
    }
    const value = await getJobOffersApi(query);
    if (value) setJobOffer(value);
    };
    getData();
  }, [JobTitleQuery,ProgrammingLanguage]);

if (!jobOffer)
    return (
      <div className="flex items-start h-64">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {jobOffer.filter(offer=>offer.isVisible)
      .map((offer) => (
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
