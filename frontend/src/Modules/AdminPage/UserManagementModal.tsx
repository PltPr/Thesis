import { GetSummaryForUser } from "Api/ApplicationService";
import { AddRoleToUser, DeleteRoleFromUser } from "Api/AuthService";
import { SummaryDto } from "Models/Application";
import { UserManagementDto } from "Models/User";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    onClose: () => void;
    UserData: UserManagementDto;
};

const UserManagementModal = ({ onClose, UserData }: Props) => {
    const [roles, setRoles] = useState<string[]>(UserData.roles);
    const [processing, setProcessing] = useState(false);
    const[summary,setSummary]=useState<SummaryDto|null>(null);

    useEffect(()=>{
        const getData=async()=>{
            try{
                var data = await GetSummaryForUser(UserData.id)
            if(data) setSummary(data)
            }catch(err){
            }
            
        };getData();
    },[])

    const addRole = async (role: string) => {
        setProcessing(true);
        try {
            await AddRoleToUser(UserData.id,role)

            if (!roles.includes(role)) {
                setRoles([...roles, role]);
            }
            toast.success("Role added!")
        }catch(err){
            toast.warning("Something went wrong");
        }
         finally {
            setProcessing(false);
        }
    };

    const removeRole = async (role: string) => {
        setProcessing(true);
        try {
            await DeleteRoleFromUser(UserData.id,role);

            setRoles(roles.filter(r => r !== role));
            toast.success("Role deleted!")
        } catch(err){
            toast.warning("Something went wrong");
        }
        finally {
            setProcessing(false);
        }
    };

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-11/12 max-w-4xl h-[80vh] shadow-xl overflow-hidden flex flex-col">

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                <h2 className="text-xl font-semibold">User Management</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
                    ×
                </button>
            </div>

            {/* CONTENT */}
            <div className="p-6 overflow-y-auto flex-1">

                {/* USER INFO */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-500">Imię</p>
                        <p className="text-lg font-medium">{UserData.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Nazwisko</p>
                        <p className="text-lg font-medium">{UserData.surname}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-lg font-medium">{UserData.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Telefon</p>
                        <p className="text-lg font-medium">{UserData.phoneNumber}</p>
                    </div>
                </div>

                {/* ROLES */}
                <div className="mb-6">
                    <p className="text-sm text-gray-500">Aktualne role</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {roles.length > 0 ? (
                            roles.map((role) => (
                                <div
                                    key={role}
                                    className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
                                >
                                    <span>{role}</span>
                                    <button
                                        disabled={processing || role=="User"}
                                        onClick={() => removeRole(role)}
                                        className="text-white hover:text-gray-200 ml-1"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))
                        ) : (
                            <span className="text-gray-500">Brak ról</span>
                        )}
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-4">
                    <button
                        disabled={processing || roles.includes("Admin")}
                        onClick={() => addRole("Admin")}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        Dodaj rolę: Admin
                    </button>

                    <button
                        disabled={processing || roles.includes("Examiner")}
                        onClick={() => addRole("Examiner")}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Dodaj rolę: Examiner
                    </button>
                </div>

                {/* APPLICATION LIST */}
                {summary && summary.applications.length > 0 && (
                
                    <div className="mt-16 ">
                        <p className="text-sm text-gray-500 font-bold mb-2">Zgłoszenia użytkownika</p>

                        <div className="max-h-56 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                            {summary.applications.map((app, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-2 border-b last:border-b-0"
                                >
                                    <span className="font-medium">{app.jobTitle}</span>
                                    <span className="text-sm text-gray-600">{app.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                
                )}
            </div>
        </div>
    </div>
);

};

export default UserManagementModal;
