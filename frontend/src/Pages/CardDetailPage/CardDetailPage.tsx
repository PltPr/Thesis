import React, { useState } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { JobOfferGet } from "../../Models/JobOffers";
import { useForm } from "react-hook-form";
import { useAuth } from "Context/useAuth";
import { AddApplicationApi } from "Api/ApplicationService";
import { toast } from "react-toastify";

type ApplyForm = {
  description: string
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
      await AddApplicationApi(form.description,cvFile,offerId);
      console.log(form.description,cvFile,offerId)
      toast.success("Application send successfully!")
    }catch(err){
      toast.error("Something went wrong")
    }
  }

  const token = localStorage.getItem("token");
  console.log(token)
  

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
          <form className="flex flex-col gap-5 border-2 border-blue-500 m-5 p-5 w-1/4" onSubmit={handleSubmit(handleApplication)}>
          <div className="flex gap-5">
            <div className="border border-black w-[300px]">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
                <div className="mt-2">
                  <input
                    id="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    defaultValue={user.name}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-900">Surname</label>
                <div className="mt-2">
                  <input
                    id="surname"
                    autoComplete="surname"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    defaultValue={user.surname}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </div>


            <div className="border border-black w-3/4">
              <div>
                <label htmlFor="PhoneNumber" className="block text-sm font-medium text-gray-900">Phone number</label>
                <div className="mt-2">
                  <input
                    id="PhoneNumber"
                    autoComplete="PhoneNumber"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    defaultValue={user.phoneNumber}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    defaultValue={user.email}
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </div>
            </div>
            <div className="border border-black w-auto">
              <div>
                <label htmlFor="Description" className="block text-sm font-medium text-gray-900 ">Description</label>
                <div className="mt-2">
                  <textarea
                    id="Description"
                    autoComplete="Description"
                    required
                    className="resize-none block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    {...register("description")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="CV" className="block text-sm font-medium text-gray-900">CV</label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="CV"
                    autoComplete="CV"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    onChange={(e)=>{
                      if (e.target.files && e.target.files.length>0){
                        setCvFile(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply
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
