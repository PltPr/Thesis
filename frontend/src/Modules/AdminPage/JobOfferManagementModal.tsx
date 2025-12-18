import { AddTechnologyToJobOffer, DeleteTechnologyFromJobOffer, GetAllTechnologies } from 'Api/JobOfferServices';
import { JobOfferGet, Technology } from 'Models/JobOffers';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';


type Props = {
    onClose: () => void;
    JobOfferData: JobOfferGet
}


const JobOfferManagementModal = ({ onClose, JobOfferData }: Props) => {
    const [requiredTech, setRequiredTech] = useState<Technology[]>(
        JobOfferData.jobOfferTechnologyRequired
    );
    const [niceToHaveTech, setNiceToHaveTech] = useState<Technology[]>(
        JobOfferData.jobOfferTechnologyNiceToHave
    );

    const [processing, setProcessing] = useState(false);
    const [technologies,setTechnologies]=useState<{label:string, value:string}[]>([]);
    const [selectedRequiredTech, setSelectedRequiredTech] = useState<{label:string, value:string} | null>(null);
    const [selectedNiceToHaveTech, setSelectedNiceToHaveTech] = useState<{label:string, value:string} | null>(null);

    useEffect(()=>{
        const getData=async()=>{
            var technologiesData = await GetAllTechnologies()
            if(technologiesData)
            {
                setTechnologies(technologiesData.map(t=>({label:t.name,value:t.name})));
            }
        };getData()
        
    },[])

    const removeRequiredTech = async (name: string) => {
        setProcessing(true);
        try {
            await DeleteTechnologyFromJobOffer(JobOfferData.id,name,"Required")
            setRequiredTech(requiredTech.filter(t => t.name !== name));
            toast.success("Deleted successfully!")
        } catch(err){
            toast.warning("Something went wrong")
        }
        finally {
            setProcessing(false);
        }
    };

    const removeNiceToHaveTech = async (name: string) => {
        setProcessing(true);
        try {
            await DeleteTechnologyFromJobOffer(JobOfferData.id,name,"NiceToHave")
            setNiceToHaveTech(niceToHaveTech.filter(t => t.name !== name));
            toast.success("Deleted successfully!")
        }catch(err){
            toast.warning("Something went wrong")
        } 
        finally {
            setProcessing(false);
        }
    };


    const handleAddRequiredTech = async (newValue:{label:string,value:string}|null)=>{
        if(!newValue){
            setSelectedRequiredTech(null)
            return;
        }
        if(requiredTech.some(t=>t.name.toLowerCase()===newValue.value.toLowerCase()))
        {
            toast.info("This technology is already required")
            setSelectedRequiredTech(null)
            return;
        }

        setSelectedRequiredTech(newValue);
        setProcessing(true)
        try{
            await AddTechnologyToJobOffer(JobOfferData.id,newValue.value,"Required")
            setRequiredTech(prev => [...prev, { name: newValue.value }]);
            toast.success("Technology added successfully")
        }catch(err){
            toast.warning("Something went wrong")
            console.log(err)
        }finally{
            setProcessing(false)
            setSelectedRequiredTech(null)
        }
    }

    const handleAddNiceToHaveTech = async (newValue:{label:string,value:string}|null)=>{
        if(!newValue){
            setSelectedNiceToHaveTech(null)
            return;
        }
        if(niceToHaveTech.some(t=>t.name.toLowerCase()===newValue.value.toLowerCase())){
            toast.info("This technology is already in nice to have")
            setSelectedNiceToHaveTech(null)
            return;
        }
        setSelectedRequiredTech(newValue)
        setProcessing(true)
        try{
            await AddTechnologyToJobOffer(JobOfferData.id,newValue.value,"NiceToHave")
            setNiceToHaveTech(prev=>[...prev,{name:newValue.value}])
            toast.success("Technology added successfully")
        }catch(err){
            toast.warning("Something went wrong")
            console.log(err)
        }finally{
            setProcessing(false)
            setSelectedRequiredTech(null)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-11/12 max-w-4xl h-[80vh] shadow-xl overflow-hidden flex flex-col">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                    <h2 className="text-xl font-semibold">Job Offer Management</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
                        ×
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 space-y-6">

                    <div className="p-6 overflow-y-auto flex-1 space-y-6">

                        {/* JOB INFO */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Stanowisko</p>
                                <p className="text-lg font-medium">{JobOfferData.jobTitle}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Typ pracy</p>
                                <p className="text-lg font-medium">{JobOfferData.jobType}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Wynagrodzenie</p>
                                <p className="text-lg font-medium">{JobOfferData.salary} $</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Język programowania</p>
                                <p className="text-lg font-medium">{JobOfferData.programmingLanguage}</p>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <p className="text-sm text-gray-500">Opis stanowiska</p>
                            <div className="mt-1 border rounded-lg p-4 bg-gray-50 whitespace-pre-line text-gray-700">
                                {JobOfferData.description}
                            </div>
                        </div>

                        {/* REQUIRED TECH */}
                        <div>
                            <p className="text-sm text-gray-500">Wymagane technologie</p>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {requiredTech.length > 0 ? (
                                    requiredTech.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center h-8 gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                                        >
                                            <span>{tech.name}</span>
                                            <button
                                                disabled={processing}
                                                onClick={() => removeRequiredTech(tech.name)}
                                                className="text-white hover:text-gray-200 ml-1"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm">Brak</span>
                                )}
                                {technologies && (<CreatableSelect 
                                isClearable 
                                options={technologies}
                                value={selectedRequiredTech}
                                onChange={handleAddRequiredTech}
                                menuPlacement='top'
                                placeholder="Add technology"
                                />)}
                                
                            </div>
                            
                        </div>
                        

                        {/* NICE TO HAVE TECH */}
                        <div>
                            <p className="text-sm text-gray-500">Mile widziane</p>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {niceToHaveTech.length > 0 ? (
                                    niceToHaveTech.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center h-8 gap-2 px-3 py-1 bg-indigo-600 text-white rounded-full text-sm"
                                        >
                                            <span>{tech.name}</span>
                                            <button
                                                disabled={processing}
                                                onClick={() => removeNiceToHaveTech(tech.name)}
                                                className="text-white hover:text-gray-200 ml-1"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm">Brak</span>
                                )}
                                {technologies && (<CreatableSelect 
                                isClearable 
                                options={technologies}
                                value={selectedNiceToHaveTech}
                                onChange={handleAddNiceToHaveTech}
                                menuPlacement='top'
                                placeholder="Add technology"
                                />)}
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}


export default JobOfferManagementModal