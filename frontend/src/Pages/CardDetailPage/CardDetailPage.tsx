import React, { useState } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { JobOfferGet } from "../../Models/JobOffers";
import { useForm } from "react-hook-form";
import { useAuth } from "Context/useAuth";
import { AddApplicationApi } from "Api/ApplicationService";
import { toast } from "react-toastify";

type ApplyForm = {
  aboutYourself: string,
  similarExperience:string,
  expectedMonthlySalary:string
}


const CardDetailPage: React.FC = () => {
  const offerIdParam = useParams().offerId;
  const offerId=offerIdParam ? parseInt(offerIdParam) : undefined
  const location = useLocation();
  const jobOffer = location.state?.jobOffer as JobOfferGet;
  const { register, handleSubmit } = useForm<ApplyForm>();
  const { user } = useAuth();
  const [cvFile,setCvFile] = useState<File|null>(null);

  

  

  if (offerId===undefined || isNaN(offerId)) {
    return <Navigate to="/" />;
  }

  const handleApplication =async (form:ApplyForm)=>{
    if(!cvFile){
      toast.error("Please upload your CV")
      return;
    }
    try{
      await AddApplicationApi(form.aboutYourself, form.expectedMonthlySalary,form.similarExperience,cvFile,offerId);
      console.log(form.aboutYourself,cvFile,offerId)
      toast.success("Application send successfully!")
    }catch(err){
      toast.error("Something went wrong")
    }
  }


  

  return (
    <>
      <div className=" w-[400px] h-[400px] m-5 bg-white border border-[#0f63ec] rounded-[10px] text-center shadow-[2px_2px_10px_rgba(0,0,0,0.1)] grid grid-cols-4">

        <div className="col-start-1 col-end-3 flex flex-col">
          <h1>{jobOffer.jobTitle}</h1>
        </div>

        <div className="col-start-1 col-end-2 flex">
          <h1></h1>
        </div>

      </div>

      {user ?
        (<div>
          <h2>Apply</h2>
          <form
  className="flex flex-col gap-6 border-2 border-blue-500 m-5 p-6 w-full max-w-xl mx-auto rounded-lg shadow-md bg-white"
  onSubmit={handleSubmit(handleApplication)}
>
  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Apply for this position</h2>

  {/* Dane użytkownika */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
      <input
        id="name"
        className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-900 outline outline-1 outline-gray-300"
        defaultValue={user.name}
        readOnly
        disabled
      />
    </div>

    <div>
      <label htmlFor="surname" className="block text-sm font-medium text-gray-900">Surname</label>
      <input
        id="surname"
        className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-900 outline outline-1 outline-gray-300"
        defaultValue={user.surname}
        readOnly
        disabled
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
      <input
        type="email"
        id="email"
        className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-900 outline outline-1 outline-gray-300"
        defaultValue={user.email}
        readOnly
        disabled
      />
    </div>

    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone number</label>
      <input
        id="phone"
        className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-900 outline outline-1 outline-gray-300"
        defaultValue={user.phoneNumber}
        readOnly
        disabled
      />
    </div>
  </div>

  {/* Sekcja o kandydacie */}
  <div>
    <label htmlFor="aboutYourself" className="block text-sm font-medium text-gray-900 mb-1">
      Tell us about yourself
    </label>
    <textarea
      id="aboutYourself"
      {...register("aboutYourself", { required: true })}
      className="resize-none block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
      rows={4}
      placeholder="Write a few sentences about yourself..."
    />
  </div>

  {/* Doświadczenie */}
  <div>
    <label htmlFor="similarExperience" className="block text-sm font-medium text-gray-900 mb-1">
      Experience on a similar position (years)
    </label>
    <select
      id="similarExperience"
      {...register("similarExperience", { required: true })}
      className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
    >
      <option value="">Select experience</option>
      <option value="0-1">0 - 1 year</option>
      <option value="1-2">1 - 2 years</option>
      <option value="2-3">2 - 3 years</option>
      <option value="4+">4+ years</option>
    </select>
  </div>

  {/* Zarobki */}
  <div>
    <label htmlFor="expectedMonthlySalary" className="block text-sm font-medium text-gray-900 mb-1">
      Expected monthly salary (PLN)
    </label>
    <input
      type="number"
      id="expectedMonthlySalary"
      {...register("expectedMonthlySalary", {
        required: true,
        valueAsNumber: true,
        min: { value: 0, message: "Salary must be positive" },
      })}
      placeholder="e.g. 8000"
      className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
    />
  </div>

  {/* CV */}
  <div>
    <label htmlFor="CV" className="block text-sm font-medium text-gray-900 mb-1">Attach CV</label>
    <input
      type="file"
      id="CV"
      required
      onChange={(e) => {
        if (e.target.files && e.target.files.length > 0) {
          setCvFile(e.target.files[0]);
        }
      }}
      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none"
    />
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
  >
    Submit Application
  </button>
</form>

        </div>)
        :
        (<h1>Login to apply!</h1>)
      }

    </>
  );
};

export default CardDetailPage;
