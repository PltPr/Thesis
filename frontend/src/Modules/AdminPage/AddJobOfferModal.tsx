import { AddJobOffer, GetAllTechnologies } from "Api/JobOfferServices";
import { Technology } from "Models/JobOffers";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
};

const JobOfferCreateModal = ({ onClose }: Props) => {
  const [processing, setProcessing] = useState(false);

  const [technologies, setTechnologies] = useState<{ label: string; value: string }[]>([]);
  const [selectedRequiredTech, setSelectedRequiredTech] = useState<{ label: string; value: string } | null>(null);
  const [selectedNiceToHaveTech, setSelectedNiceToHaveTech] = useState<{ label: string; value: string } | null>(null);

  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [salary, setSalary] = useState<number | "">("");
  const [programmingLanguage, setProgrammingLanguage] = useState("N/A");
  const [description, setDescription] = useState("");

  const [requiredTech, setRequiredTech] = useState<Technology[]>([]);
  const [niceToHaveTech, setNiceToHaveTech] = useState<Technology[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await GetAllTechnologies();
      if (data) setTechnologies(data.map(t => ({ label: t.name, value: t.name })));
    };
    getData();
  }, []);

  const handleAddRequiredTech = (newValue: any) => {
    if (!newValue) return setSelectedRequiredTech(null);
    if (requiredTech.some(t => t.name.toLowerCase() === newValue.value.toLowerCase())) {
      toast.info("Already added");
      return;
    }
    setRequiredTech(prev => [...prev, { name: newValue.value }]);
    setSelectedRequiredTech(null);
  };

  const handleAddNiceToHaveTech = (newValue: any) => {
    if (!newValue) return setSelectedNiceToHaveTech(null);
    if (niceToHaveTech.some(t => t.name.toLowerCase() === newValue.value.toLowerCase())) {
      toast.info("Already added");
      return;
    }
    setNiceToHaveTech(prev => [...prev, { name: newValue.value }]);
    setSelectedNiceToHaveTech(null);
  };

  const removeRequiredTech = (name: string) => {
    setRequiredTech(requiredTech.filter(t => t.name !== name));
  };

  const removeNiceToHaveTech = (name: string) => {
    setNiceToHaveTech(niceToHaveTech.filter(t => t.name !== name));
  };

  const handleCreate = async () => {
    if (!jobTitle.trim()) return toast.error("Job title required");
    if (!salary || salary <= 0) return toast.error("Salary required");
    if (!description.trim()) return toast.error("Description required");

    setProcessing(true);
    try {
      await AddJobOffer(
        jobTitle,
        jobType,
        salary,
        programmingLanguage,
        description,
        requiredTech,
        niceToHaveTech
      );
      toast.success("Offer created!");
      onClose();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-11/12 max-w-4xl h-[80vh] shadow-xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold">Create Job Offer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">×</button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* JOB INFO */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              placeholder="Stanowisko"
              className="w-full border rounded px-2 py-1"
            />

            <select
              value={jobType}
              onChange={e => setJobType(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            <input
              type="number"
              value={salary}
              onChange={e => setSalary(Number(e.target.value))}
              placeholder="Wynagrodzenie"
              className="w-full border rounded px-2 py-1"
            />

            <select
              value={programmingLanguage}
              onChange={e => setProgrammingLanguage(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="N/A">N/A</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
          </div>

          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Opis stanowiska"
            rows={5}
            className="w-full border rounded-lg p-2 bg-white"
          />

          {/* TECHNOLOGIE */}
          <div>
            <p className="text-sm text-gray-500">Wymagane technologie</p>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              {requiredTech.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center h-8 gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                >
                  <span>{tech.name}</span>
                  <button onClick={() => removeRequiredTech(tech.name)} className="hover:text-gray-200 ml-1">✕</button>
                </div>
              ))}

              <CreatableSelect
                isClearable
                options={technologies}
                value={selectedRequiredTech}
                onChange={handleAddRequiredTech}
                menuPlacement="top"
                placeholder="Add technology"
                className="min-w-[200px] flex-grow"
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Mile widziane</p>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              {niceToHaveTech.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center h-8 gap-2 px-3 py-1 bg-indigo-600 text-white rounded-full text-sm"
                >
                  <span>{tech.name}</span>
                  <button onClick={() => removeNiceToHaveTech(tech.name)} className="hover:text-gray-200 ml-1">✕</button>
                </div>
              ))}

              <CreatableSelect
                isClearable
                options={technologies}
                value={selectedNiceToHaveTech}
                onChange={handleAddNiceToHaveTech}
                menuPlacement="top"
                placeholder="Add technology"
                className="min-w-[200px] flex-grow"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Anuluj
          </button>
          <button
            onClick={handleCreate}
            disabled={processing}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Utwórz ofertę
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobOfferCreateModal;
