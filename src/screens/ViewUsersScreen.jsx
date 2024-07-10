import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetUsersMutation,
  useDeleteUserMutation,
  useSeachUserMutation,
} from "../slices/adminApiSlice";
import { toast } from "react-toastify";
import Modal from "react-modal";

const ViewUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [getUsers] = useGetUsersMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [searchUser] = useSeachUserMutation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers().unwrap();
      setUsers(res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const res = await searchUser({ query: searchQuery }).unwrap();
        setUsers(res);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      fetchUsers();
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Users</h2>
          <Link to="/admin/createUser">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">
              Create User
            </button>
          </Link>
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-2xl rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-5 py-4 border-b-2 border-gray-300 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">
                    No.
                  </th>
                  <th className="px-5 py-4 border-b-2 border-gray-300 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">
                    Profile Picture
                  </th>
                  <th className="px-5 py-4 border-b-2 border-gray-300 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-5 py-4 border-b-2 border-gray-300 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-5 py-4 border-b-2 border-gray-300 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">
                    Modify
                  </th>
                  <th className="px-5 py-4 border-b-2 border-gray-300 text-left text-sm font-extrabold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="   ">
                {users?.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                      <img
                        className="h-20 w-20 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                        src={
                          user?.profilePicture
                            ? `http://localhost:8000${user.profilePicture}`
                            : "https://via.placeholder.com/150"
                        }
                        alt=""
                      />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold text-gray-800">
                      {user.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => openModal(user)}
                        className="bg-blue-100 text-blue-800 font-bold py-2 px-4 rounded-full hover:bg-blue-200 transition-colors duration-300"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() =>
                          navigate(`/admin/profile/${user._id}?admin=true`)
                        }
                        className="bg-green-100 text-green-800 font-bold py-2 px-4 rounded-full hover:bg-green-200 transition-colors duration-300"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-100 text-red-800 font-bold py-2 px-4 rounded-full hover:bg-red-200 transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Details"
        className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedUser && (
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedUser.name}
            </h2>
            <img
              className="h-32 w-32 rounded-full object-cover border-4 border-gray-300 shadow-lg mx-auto mb-4"
              src={
                selectedUser?.profilePicture
                  ? `http://localhost:8000${selectedUser.profilePicture}`
                  : "https://via.placeholder.com/150"
              }
              alt={selectedUser.name}
            />
            <p className="text-gray-700 text-lg">
              <strong>Username:</strong> {selectedUser.name}
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ViewUsersScreen;
