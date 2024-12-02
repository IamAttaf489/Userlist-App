import { useDispatch, useSelector } from "react-redux";
import CustomModal from "./UserDetailsModal";
import { useEffect, useState } from "react";
import { fetchUsers, searchUsers, User } from "../features/userSlice";
import { AppDispatch, RootState } from "../store";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers({ limit: 10, skip: 0 }));
  }, [dispatch]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      dispatch(fetchUsers({ limit: 10, skip: 0 }));
    } else {
      dispatch(searchUsers(searchTerm));
    }
  };

  const handleRowClick = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setSelectedUser(user);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(users)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="h-20 w-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          role="status"
        />
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl text-center font-semibold leading-tight pb-3">
            User List App
          </h2>
        </div>
        <div className="my-1 text-end">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="border px-3 py-2 rounded"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
          >
            Search
          </button>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="text-start px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                    Sr. No
                  </th>
                  <th className="text-start px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                    First Name
                  </th>
                  <th className="text-start px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                    Last Name
                  </th>
                  <th className="text-start px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                    Email
                  </th>
                  <th className="text-start px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                    Phone
                  </th>
                  <th className="text-start px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                    Company Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user: User,index:number) => (
                    <tr key={index} onClick={() => handleRowClick(user.id)} className=" cursor-pointer">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {index + 1}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {user.firstName}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {user.lastName}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {user.email}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {user.phone}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {user.company?.name || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <CustomModal isOpen={isModalOpen} onClose={closeModal}>
            {selectedUser ? (
              <div className="flex flex-col gap-3 p-4">
                <h3 className="text-xl font-bold mb-4">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h3>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser.phone}
                </p>
                <p>
                  <strong>Company:</strong>{" "}
                  {selectedUser.company?.name || "N/A"}
                </p>
                <p>
                  <strong>Company Title:</strong>{" "}
                  {selectedUser.company?.title || "N/A"}
                </p>
                <p>
                  <strong>Company Address:</strong>{" "}
                  {selectedUser.company?.address.address || "N/A"}
                </p>
                <p>
                  <strong>Company Department:</strong>{" "}
                  {selectedUser.company?.department || "N/A"}
                </p>
              </div>
            ) : (
              <p>Loading user details...</p>
            )}
          </CustomModal>
        </div>
      </div>
    </div>
  );
};

export default UserList;
