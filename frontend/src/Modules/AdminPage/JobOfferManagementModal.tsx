import {
  AddTechnologyToJobOffer,
  ChangeVisibility,
  DeleteJobOffer,
  DeleteTechnologyFromJobOffer,
  GetAllTechnologies,
  UpdateOffer,
} from 'Api/JobOfferServices';
import { JobOfferGet, Technology } from 'Models/JobOffers';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';

type Props = {
  onClose: () => void;
  JobOfferData: JobOfferGet;
};

const JobOfferManagementModal = ({ onClose, JobOfferData }: Props) => {
  const [offerData, setOfferData] = useState(JobOfferData);
  const [requiredTech, setRequiredTech] = useState<Technology[]>(JobOfferData.jobOfferTechnologyRequired);
  const [niceToHaveTech, setNiceToHaveTech] = useState<Technology[]>(JobOfferData.jobOfferTechnologyNiceToHave);

  const [processing, setProcessing] = useState(false);
  const [technologies, setTechnologies] = useState<{ label: string; value: string }[]>([]);
  const [selectedRequiredTech, setSelectedRequiredTech] = useState<{ label: string; value: string } | null>(null);
  const [selectedNiceToHaveTech, setSelectedNiceToHaveTech] = useState<{ label: string; value: string } | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [editableJobTitle, setEditableJobTitle] = useState(offerData.jobTitle);
  const [editableJobType, setEditableJobType] = useState(offerData.jobType);
  const [editableSalary, setEditableSalary] = useState(offerData.salary);
  const [editableProgrammingLanguage, setEditableProgrammingLanguage] = useState(offerData.programmingLanguage);
  const [editableDescription, setEditableDescription] = useState(offerData.description);

  useEffect(() => {
    const getData = async () => {
      const technologiesData = await GetAllTechnologies();
      if (technologiesData) {
        setTechnologies(technologiesData.map(t => ({ label: t.name, value: t.name })));
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (isEditing) {
      setEditableJobTitle(offerData.jobTitle);
      setEditableJobType(offerData.jobType);
      setEditableSalary(offerData.salary);
      setEditableProgrammingLanguage(offerData.programmingLanguage);
      setEditableDescription(offerData.description);
    }
  }, [isEditing, offerData]);

  const ChangeOfferVisibility = async (visibility: boolean) => {
    try {
      await ChangeVisibility(offerData.id, visibility);
      setOfferData(prev => ({ ...prev, isVisible: visibility }));
      toast.success('Offer successfully updated');
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async () => {
    try {
      await DeleteJobOffer(offerData.id);
      toast.success('Offer deleted successfully!');
      onClose();
    } catch {
      toast.error('Something went wrong!');
    }
  };

  const handleSave = async () => {
    try {
      const updated = await UpdateOffer(
        offerData.id,
        editableJobTitle,
        editableJobType,
        editableSalary,
        editableProgrammingLanguage,
        editableDescription
      );

      setOfferData(prev => ({
        ...prev,
        jobTitle: updated.jobTitle,
        jobType: updated.jobType,
        salary: updated.salary,
        programmingLanguage: updated.programmingLanguage,
        description: updated.description,
      }));

      toast.success('Data updated successfully');
      setIsEditing(false);
    } catch {
      toast.error('Something went wrong');
    }
  };

  const removeRequiredTech = async (name: string) => {
    setProcessing(true);
    try {
      await DeleteTechnologyFromJobOffer(offerData.id, name, 'Required');
      setRequiredTech(requiredTech.filter(t => t.name !== name));
      toast.success('Deleted successfully!');
    } catch {
      toast.warning('Something went wrong');
    } finally {
      setProcessing(false);
    }
  };

  const removeNiceToHaveTech = async (name: string) => {
    setProcessing(true);
    try {
      await DeleteTechnologyFromJobOffer(offerData.id, name, 'NiceToHave');
      setNiceToHaveTech(niceToHaveTech.filter(t => t.name !== name));
      toast.success('Deleted successfully!');
    } catch {
      toast.warning('Something went wrong');
    } finally {
      setProcessing(false);
    }
  };

  const handleAddRequiredTech = async (newValue: { label: string; value: string } | null) => {
    if (!newValue) {
      setSelectedRequiredTech(null);
      return;
    }
    if (requiredTech.some(t => t.name.toLowerCase() === newValue.value.toLowerCase())) {
      toast.info('This technology is already required');
      setSelectedRequiredTech(null);
      return;
    }

    setSelectedRequiredTech(newValue);
    setProcessing(true);
    try {
      await AddTechnologyToJobOffer(offerData.id, newValue.value, 'Required');
      setRequiredTech(prev => [...prev, { name: newValue.value }]);
      toast.success('Technology added successfully');
    } catch {
      toast.warning('Something went wrong');
    } finally {
      setProcessing(false);
      setSelectedRequiredTech(null);
    }
  };

  const handleAddNiceToHaveTech = async (newValue: { label: string; value: string } | null) => {
    if (!newValue) {
      setSelectedNiceToHaveTech(null);
      return;
    }
    if (niceToHaveTech.some(t => t.name.toLowerCase() === newValue.value.toLowerCase())) {
      toast.info('This technology is already in nice to have');
      setSelectedNiceToHaveTech(null);
      return;
    }

    setSelectedNiceToHaveTech(newValue);
    setProcessing(true);
    try {
      await AddTechnologyToJobOffer(offerData.id, newValue.value, 'NiceToHave');
      setNiceToHaveTech(prev => [...prev, { name: newValue.value }]);
      toast.success('Technology added successfully');
    } catch {
      toast.warning('Something went wrong');
    } finally {
      setProcessing(false);
      setSelectedNiceToHaveTech(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-11/12 max-w-4xl h-[80vh] shadow-xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold">Job Offer Management</h2>
          <div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 mx-10 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isEditing ? 'Zakończ edycje' : 'Edytuj'}
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
              ×
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* JOB INFO */}
          <div className="grid grid-cols-2 gap-4">

            {/* Stanowisko */}
            <div>
              <p className="text-sm text-gray-500">Stanowisko</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editableJobTitle}
                  onChange={e => setEditableJobTitle(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                <p className="text-lg font-medium">{offerData.jobTitle}</p>
              )}
            </div>

            {/* Typ pracy */}
            <div>
              <p className="text-sm text-gray-500">Typ pracy</p>
              {isEditing ? (
                <select
                  value={editableJobType}
                  onChange={e => setEditableJobType(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              ) : (
                <p className="text-lg font-medium">{offerData.jobType}</p>
              )}
            </div>

            {/* Wynagrodzenie */}
            <div>
              <p className="text-sm text-gray-500">Wynagrodzenie</p>
              {isEditing ? (
                <input
                  type="number"
                  value={editableSalary}
                  onChange={e => setEditableSalary(Number(e.target.value))}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                <p className="text-lg font-medium">{offerData.salary} $</p>
              )}
            </div>

            {/* Język programowania */}
            <div>
              <p className="text-sm text-gray-500">Język programowania</p>
              {isEditing ? (
                <select
                  value={editableProgrammingLanguage}
                  onChange={e => setEditableProgrammingLanguage(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="N/A">N/A</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                  <option value="Ruby">Ruby</option>
                </select>
              ) : (
                <p className="text-lg font-medium">{offerData.programmingLanguage}</p>
              )}
            </div>
          </div>

          {/* Opis stanowiska */}
          <div>
            <p className="text-sm text-gray-500">Opis stanowiska</p>
            {isEditing ? (
              <textarea
                value={editableDescription}
                onChange={e => setEditableDescription(e.target.value)}
                className="mt-1 w-full border rounded-lg p-2 bg-white text-gray-700"
                rows={5}
              />
            ) : (
              <div className="mt-1 border rounded-lg p-4 bg-gray-50 whitespace-pre-line text-gray-700">
                {offerData.description}
              </div>
            )}
          </div>

          {/* SAVE BUTTON */}
          {isEditing && (
            <div className="mt-4 flex gap-2 justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={processing}
                onClick={handleSave}
              >
                Zapisz zmiany
              </button>
            </div>
          )}

          {/* TECHNOLOGIE */}
          <div>
            <p className="text-sm text-gray-500">Wymagane technologie</p>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              {requiredTech.length > 0 ? (
                requiredTech.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center h-8 gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                  >
                    <span>{tech.name}</span>
                    {isEditing && (
                      <button
                        disabled={processing}
                        onClick={() => removeRequiredTech(tech.name)}
                        className="text-white hover:text-gray-200 ml-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <span className="text-gray-400 text-sm">Brak</span>
              )}
              {technologies && isEditing && (
                <CreatableSelect
                  isClearable
                  options={technologies}
                  value={selectedRequiredTech}
                  onChange={handleAddRequiredTech}
                  menuPlacement="top"
                  placeholder="Add technology"
                  className="min-w-[200px] flex-grow"
                />
              )}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Mile widziane</p>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              {niceToHaveTech.length > 0 ? (
                niceToHaveTech.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center h-8 gap-2 px-3 py-1 bg-indigo-600 text-white rounded-full text-sm"
                  >
                    <span>{tech.name}</span>
                    {isEditing && (
                      <button
                        disabled={processing}
                        onClick={() => removeNiceToHaveTech(tech.name)}
                        className="text-white hover:text-gray-200 ml-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <span className="text-gray-400 text-sm">Brak</span>
              )}
              {technologies && isEditing && (
                <CreatableSelect
                  isClearable
                  options={technologies}
                  value={selectedNiceToHaveTech}
                  onChange={handleAddNiceToHaveTech}
                  menuPlacement="top"
                  placeholder="Add technology"
                  className="min-w-[200px] flex-grow"
                />
              )}
            </div>
          </div>

          <hr className="border-t border-gray-300 my-4" />

          {isEditing && (
            <div>
              <h1 className="text-lg font-semibold text-gray-700 mb-3">Actions</h1>
              <div className="flex flex-wrap gap-3">
                <button
                  className={`px-4 py-2 rounded-md text-white transition ${
                    offerData.isVisible
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-orange-300 cursor-not-allowed opacity-60'
                  }`}
                  disabled={!offerData.isVisible}
                  onClick={() => ChangeOfferVisibility(false)}
                >
                  Zakończ rekrutacje
                </button>

                <button
                  className={`px-4 py-2 rounded-md text-white transition ${
                    !offerData.isVisible
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-green-300 cursor-not-allowed opacity-60'
                  }`}
                  disabled={offerData.isVisible}
                  onClick={() => ChangeOfferVisibility(true)}
                >
                  Wznów rekrutacje
                </button>

                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  onClick={handleDelete}
                >
                  Usuń ofertę
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobOfferManagementModal;
