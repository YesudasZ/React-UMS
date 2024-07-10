import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const imageUrl = userInfo?.profilePicture
    ? `http://localhost:8000${userInfo.profilePicture}`
    : "https://via.placeholder.com/150";

  const AdminDashboard = () => (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-800 shadow-2xl rounded-3xl overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-white">
              Admin Dashboard
            </h2>
            <p className="mt-2 text-xl text-blue-100">
              Welcome back, {userInfo.name}!
            </p>
          </div>
          <img
            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
            src={imageUrl}
            alt={userInfo.name}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-violet-400	background-color: rgb(167 139 250) bg-opacity-20 rounded-xl p-6 backdrop-filter backdrop-blur-lg">
            <h3 className="text-xl font-semibold text-white mb-2">
              Quick Stats
            </h3>
            <p className="text-blue-100">Total Users: 12</p>
            <p className="text-blue-100">New Users (Today): 2</p>
          </div>
          <div className="bg-violet-400	background-color: rgb(167 139 250) bg-opacity-20 rounded-xl p-6 backdrop-filter backdrop-blur-lg">
            <h3 className="text-xl font-semibold text-white mb-2">
              Recent Activity
            </h3>
            <p className="text-blue-100">Last login: 1 hours ago</p>
            <p className="text-blue-100">Last user created: 30 minutes ago</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/admin/getUsers")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            View Users
          </button>
          <Link
            to="/profile"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );

  const UserDashboard = () => (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 p-6 flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
          <img
            className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
            src={imageUrl}
            alt={userInfo.name}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Dashboard
          </div>
          <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome, {userInfo.name}!
          </h2>
          <p className="mt-4 text-lg text-gray-500">Email: {userInfo.email}</p>
          <p className="mt-2 text-lg text-gray-500">
            This is your personalized dashboard. Explore your account and manage
            your settings.
          </p>
          <div className="mt-6">
            <Link
              to="/profile"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const GuestHome = () => (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          UMS Authentication
        </h2>
        <p className="mt-4 text-xl text-gray-500">
          This is a boilerplate for UMS authentication that stores a JWT in an
          HTTP-Only cookie. It also uses Redux Toolkit and Tailwind CSS.
        </p>
        <div className="mt-8 flex space-x-4">
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {userInfo ? (
          userInfo.isAdmin ? (
            <AdminDashboard />
          ) : (
            <UserDashboard />
          )
        ) : (
          <GuestHome />
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
