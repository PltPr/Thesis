import { GetAllUsers } from 'Api/AuthService';
import { UserManagementDto } from 'Models/User';
import UserManagementModal from 'Modules/AdminPage/UserManagementModal';
import React, { useEffect, useState } from 'react';

const UsersManagementPage = () => {
  const [users, setUsers] = useState<UserManagementDto[] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserManagementDto | null>(null);

  const getData = async () => {
    try {
      const usersData = await GetAllUsers();
      if (usersData) setUsers(usersData);
    } catch (err) {
      // optional error handling
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    getData();
  };

  if (!users)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );

  return (
  <div className="p-6 max-w-7xl mx-auto bg-gradient-to-b from-blue-50 to-white min-h-screen rounded-3xl shadow-lg overflow-x-auto">
    <div className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            {['First name', 'Last name', 'Email', 'Phone', 'Roles', 'Actions'].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <td className="px-6 py-4 text-gray-800">{user.name}</td>
              <td className="px-6 py-4 text-gray-800">{user.surname}</td>
              <td className="px-6 py-4 text-gray-700">{user.email}</td>
              <td className="px-6 py-4 text-gray-700">{user.phoneNumber}</td>
              <td className="px-6 py-4 text-gray-700">
                {user.roles.join(', ')}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setIsModalVisible(true);
                    setSelectedUser(user);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
                  aria-label={`Show details for ${user.name} ${user.surname}`}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {isModalVisible && selectedUser && (
      <UserManagementModal onClose={handleClose} UserData={selectedUser} />
    )}
  </div>
);


};

export default UsersManagementPage;
