import { GetAllUsers } from 'Api/AuthService';
import { UserManagementDto } from 'Models/User'
import UserManagementModal from 'Modules/AdminPage/UserManagementModal';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {}

const UsersManagementPage = (props: Props) => {
    const [users, setUsers] = useState<UserManagementDto[] | null>(null);
    const[isModalVisible,setIsModalVisible]=useState<boolean>(false);
    const[selectedUser,setSelectedUser]=useState<UserManagementDto|null>(null);

    const getData = async () => {
            try {
                var usersData = await GetAllUsers()
                if (usersData) setUsers(usersData);
            } catch (err) {

            }
        }

    useEffect(() => {
        getData();
    }, [])

    const handleClose=()=>{
      setIsModalVisible(false);
      setSelectedUser(null);
      getData();

    }

    if (users == null)
        return (<span className="loading loading-spinner loading-md text-blue-500"></span>)

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
                <thead className="bg-blue-300 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Imię</th>
                        <th className="px-4 py-2 text-left">Nazwisko</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Telefon</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr
                            key={user.id}
                            className="border-t border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.surname}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.phoneNumber}</td>
                            <td className="px-4 py-2">{user.roles.join(', ')}</td>

                            
                            <td className="px-4 py-2">
                                <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                    onClick={()=>{setIsModalVisible(true); setSelectedUser(user)}}
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalVisible && selectedUser && <UserManagementModal onClose={handleClose} UserData={selectedUser} />}
        </div>
    );
}

export default UsersManagementPage;
