import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { motion } from "motion/react";
import axios from "axios";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const {
    logout,
    user,
    updateProfile,
    paymentHistory,
    credit,
    loadCreditsData,
    getPaymentHistory,
    backendUrl,
    setUser,
  } = useContext(AppContext);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile({ name, email });
    setEditMode(false);
  };

  useEffect(() => {
    loadCreditsData();
    getPaymentHistory(user._id);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(backendUrl + "/api/user/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch((err) => console.error("Failed to fetch updated user", err));
    }
  }, []);

  return (
    <section className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-8">
      <motion.div
        className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-5xl p-8"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="orbitron text-3xl font-bold mb-6 text-center">
          My Profile
        </h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-700 p-6 rounded-xl text-center">
            <p className="text-lg text-gray-300">Credits Left</p>
            <p className="text-3xl font-bold text-yellow-400">{credit}</p>
          </div>

          <div className="bg-gray-700 p-6 rounded-xl text-center">
            <p className="text-lg text-gray-300">Total Bets Won</p>
            <p className="text-3xl font-bold text-blue-400">
              {user.totalBetWon}
            </p>
          </div>

          <div className="bg-gray-700 p-6 rounded-xl text-center">
            <p className="text-lg text-gray-300">Total Profit</p>
            <p className="text-3xl font-bold text-green-500">
              ₹{user.totalProfit}
            </p>
          </div>
        </div>

        {/* Editable Details */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editMode}
              className={`w-full px-4 py-2 rounded-lg mt-1 bg-gray-700 border ${
                editMode ? "border-yellow-400" : "border-gray-600"
              } focus:outline-none`}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editMode}
              className={`w-full px-4 py-2 rounded-lg mt-1 bg-gray-700 border ${
                editMode ? "border-yellow-400" : "border-gray-600"
              } focus:outline-none`}
            />
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-gray-700 p-6 rounded-xl mb-10 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="py-2">Date</th>
                <th className="py-2">Transaction ID</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(paymentHistory) && paymentHistory.length > 0 ? (
                paymentHistory.map((obj) => (
                  <tr className="border-t border-gray-600" key={obj._id}>
                    <td className="py-2">
                      {new Date(obj.date).toLocaleDateString("en-CA")}
                    </td>
                    <td className="py-2">{obj._id}</td>
                    <td className="py-2 text-green-400">₹ {obj.amount}</td>
                    <td className="py-2">
                      {obj.payment ? (
                        <span className="text-green-400">Success</span>
                      ) : (
                        <span className="text-red-400">Failed</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 text-center" colSpan={4}>
                    No transaction yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* <div className="bg-gray-700 p-6 rounded-xl mb-10 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="py-2">Date</th>
                <th className="py-2">Transaction ID</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-600">
                <td className="py-2">2025-09-18</td>
                <td className="py-2">548626579147</td>
                <td className="py-2 text-green-400">+ ₹2000</td>
                <td className="py-2">Success</td>
              </tr>
            </tbody>
          </table>
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md bg-red-600 text-white hover:bg-red-500 hover:shadow-red-500/40 active:scale-95"
          >
            Home
          </button>

          {editMode ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md bg-yellow-400 text-black hover:bg-yellow-300 hover:shadow-yellow-400/40 active:scale-95"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md bg-blue-500 text-white hover:bg-blue-400 hover:shadow-blue-500/40 active:scale-95"
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={() => navigate("/pricing")}
            className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md bg-green-600 text-white hover:bg-green-500 hover:shadow-green-500/40 active:scale-95"
          >
            Buy Credit
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md bg-purple-600 text-white hover:bg-purple-500 hover:shadow-purple-500/40 active:scale-95"
          >
            Contact
          </button>

          <button
            onClick={logout}
            className="px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md bg-red-600 text-white hover:bg-red-500 hover:shadow-red-500/40 active:scale-95"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
