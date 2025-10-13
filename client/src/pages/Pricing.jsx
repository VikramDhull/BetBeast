import React from "react";
import Navbar from "../components/Navbar";
import pricing from "../assets/pricing.jpg";
import { motion } from "motion/react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Pricing = () => {
  const {
    user,
    setUser,
    setShowLogin,
    backendUrl,
    loadCreditsData,
    token,
    setShowLoading,
  } = useContext(AppContext);

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credit Payment",
      description: "Credit Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/payment/verify-razor",
            res,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (data.success) {
            toast.success("Payment Successful. Credit Added");
            loadCreditsData();

            // 🔥 refetch updated user after credits are added
            const { data: userData } = await axios.get(
              backendUrl + "/api/user/get-profile",
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setUser(userData.user);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    setShowLoading(true);
    if (!user) {
      setShowLoading(false);
      setShowLogin(true);
      toast.error("Login to continue");
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/payment/pay-razor",
        { planId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setShowLoading(false);
        initPay(data.order);
      }
    } catch (error) {
      setShowLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen w-screen"
      style={{ backgroundImage: `url(${pricing})` }}
    >
      <Navbar />
      <motion.div
        className="flex flex-col justify-center items-center  py-10"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="orbitron text-3xl sm:text-4xl font-bold text-white mb-10">
          Choose Your Plan
        </h2>

        <div className="grid gap-20 md:grid-cols-2 w-[400px] sm:w-[830px] mx-auto px-6">
          <div className="bg-white shadow-lg rounded-2xl p-8 border hover:shadow-xl transition hover:scale-102">
            <h3 className="orbitron text-3xl font-semibold text-gray-800">
              Basic
            </h3>
            <p className="text-gray-500 mt-2">Perfect for casual players</p>
            <p className="text-4xl font-bold text-gray-900 mt-6">
              ₹3999 <span className="text-lg text-gray-500">/ 40 credits</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✔ Access to basic strategies</li>
              <li>✔ Smart bet guidance</li>
              <li>✔ Win/Loss tracking</li>
              <li>✔ Updates & support</li>
            </ul>
            <button
              onClick={() => paymentRazorpay("Basic")}
              className="sm:mt-26 cursor-pointer mt-8 w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 active:scale-98 transition"
            >
              Get Basic
            </button>
          </div>

          <div className="bg-gray-900 shadow-lg rounded-2xl p-8 text-white border-2 border-yellow-400 hover:shadow-2xl transition relative hover:scale-102">
            <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
              Popular
            </span>
            <h3 className="orbitron text-3xl font-semibold">Advanced</h3>
            <p className="text-gray-300 mt-2">For serious profit seekers</p>
            <p className="text-4xl font-bold mt-6">
              ₹19999{" "}
              <span className="text-lg text-gray-400">/ 250 credits</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-200">
              <li>✔ All Basic features</li>
              <li>✔ Access to exclusive strategies</li>
              <li>✔ Smart bet guidance</li>
              <li>✔ Win/Loss tracking</li>
              <li>✔ Personalized bet calculations</li>
              <li>✔ Priority updates & support</li>
            </ul>
            <button
              onClick={() => paymentRazorpay("Advanced")}
              className="cursor-pointer mt-8 w-full bg-yellow-400 text-black py-3 rounded-xl font-medium hover:bg-yellow-300 active:scale-98 transition"
            >
              Get Advanced
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
