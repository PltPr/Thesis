import React, { useState } from "react";
import { useParams, useLocation, Navigate, Link } from "react-router-dom";
import { JobOfferGet } from "../../Models/JobOffers";
import { useForm } from "react-hook-form";
import { useAuth } from "Context/useAuth";
import { AddApplicationApi } from "Api/ApplicationService";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";

type ApplyForm = {
  aboutYourself: string;
  similarExperience: string;
  expectedMonthlySalary: string;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CardDetailPage: React.FC = () => {
  const offerIdParam = useParams().offerId;
  const offerId = offerIdParam ? parseInt(offerIdParam) : undefined;

  const location = useLocation();
  const jobOffer = location.state?.jobOffer as JobOfferGet;

  const { register, handleSubmit } = useForm<ApplyForm>();
  const { user } = useAuth();
  const [cvFile, setCvFile] = useState<File | null>(null);

  if (offerId === undefined || isNaN(offerId)) {
    return <Navigate to="/" />;
  }

  const handleApplication = async (form: ApplyForm) => {
    if (!cvFile) {
      toast.error("Please upload your CV");
      return;
    }
    try {
      await AddApplicationApi(
        form.aboutYourself,
        form.expectedMonthlySalary,
        form.similarExperience,
        cvFile,
        offerId
      );
      toast.success("Application sent successfully!");
    } catch (error:unknown) {
      if(axios.isAxiosError(error)&&error.response)
      {
        const message = error.response.data.message;
        toast.warning(message);
      }else{
        toast.warning("Network error. Please try again later.")
      }
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white py-16 px-6">
    <div className="max-w-4xl mx-auto">

      {/* OFFER CARD */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200 mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900">{jobOffer.jobTitle}</h1>

        {/* Job Type */}
        <div className="mt-2 text-gray-700">
          <span className="font-semibold">Job type: </span>
          {jobOffer.jobType}
        </div>

        {/* Salary */}
        <div className="mt-1 text-gray-700">
          <span className="font-semibold">Salary: </span>
          {jobOffer.salary} $
        </div>

        {/* Language */}
        <div className="mt-1 text-gray-700">
          <span className="font-semibold">Programming language: </span>
          {jobOffer.programmingLanguage}
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line leading-6">
            {jobOffer.description}
          </p>
        </div>

        {/* TECH REQUIRED */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Required Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {jobOffer.jobOfferTechnologyRequired?.length > 0 ? (
              jobOffer.jobOfferTechnologyRequired.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {t.name}
                </span>
              ))
            ) : (
              <span className="text-gray-600">No required technologies listed.</span>
            )}
          </div>
        </div>

        {/* TECH NICE TO HAVE */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Nice to Have</h2>
          <div className="flex flex-wrap gap-2">
            {jobOffer.jobOfferTechnologyNiceToHave?.length > 0 ? (
              jobOffer.jobOfferTechnologyNiceToHave.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {t.name}
                </span>
              ))
            ) : (
              <span className="text-gray-600">No optional technologies listed.</span>
            )}
          </div>
        </div>
      </motion.div>

      {/* APPLY FORM */}
      {user ? (
        <motion.form
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          onSubmit={handleSubmit(handleApplication)}
          className="bg-white rounded-2xl shadow-xl border border-blue-200 p-8 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">
            Apply for this position
          </h2>

          {/* USER DATA */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-800">Name</label>
              <input
                className="w-full rounded-md bg-gray-100 px-3 py-2"
                defaultValue={user.name}
                disabled
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-800">Surname</label>
              <input
                className="w-full rounded-md bg-gray-100 px-3 py-2"
                defaultValue={user.surname}
                disabled
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-800">Email</label>
              <input
                className="w-full rounded-md bg-gray-100 px-3 py-2"
                defaultValue={user.email}
                disabled
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-800">Phone</label>
              <input
                className="w-full rounded-md bg-gray-100 px-3 py-2"
                defaultValue={user.phoneNumber}
                disabled
              />
            </div>
          </div>

          {/* ABOUT YOURSELF */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Tell us about yourself
            </label>
            <textarea
              {...register("aboutYourself", { required: true })}
              className="w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300 focus:outline-blue-500"
              rows={4}
              placeholder="Write about yourself..."
            />
          </div>

          {/* EXPERIENCE */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-900 mb-1">
              Experience in similar role
            </label>
            <select
              {...register("similarExperience", { required: true })}
              className="w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300"
            >
              <option value="">Select</option>
              <option value="0-1">0 - 1 year</option>
              <option value="1-2">1 - 2 years</option>
              <option value="2-3">2 - 3 years</option>
              <option value="4+">4+ years</option>
            </select>
          </div>

          {/* SALARY */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-900 mb-1">
              Expected monthly salary (PLN)
            </label>
            <input
              type="number"
              {...register("expectedMonthlySalary", { required: true })}
              className="w-full rounded-md px-3 py-2 outline outline-1 outline-gray-300"
            />
          </div>

          {/* CV */}
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-900 mb-1">
              Upload CV
            </label>
            <input
              type="file"
              required
              onChange={(e) =>
                setCvFile(e.target.files ? e.target.files[0] : null)
              }
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 cursor-pointer"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md"
          >
            Submit Application
          </button>
        </motion.form>
      ) : (
        <h1 className="text-center text-xl font-semibold text-gray-900">
          <Link to="/login-page">
            <button className="mt-6 w-1/5 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md">
              Login to apply!
            </button>
          </Link>
        </h1>
      )}
    </div>
  </div>
);

};

export default CardDetailPage;
