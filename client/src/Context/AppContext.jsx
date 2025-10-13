import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showSafeSquareQ, setShowSafeSquareQ] = useState(false);
  const [showTheNetQ, setShowTheNetQ] = useState(false);
  const [showTheMatrixQ, setShowTheMatrixQ] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // const goToProtectedPage = async (path) => {
  //   try {
  //     const { data } = await axios.post(backendUrl + "/api/user" + path, {
  //       headers: { token },
  //     });
  //     if (data.success) {
  //       navigate(path);
  //     } else {
  //       setShowLogin(true);
  //     }
  //   } catch (error) {
  //     setShowLogin(true);
  //   }
  // };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(backendUrl + "/api/user/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    }
  }, []);

  const getPaymentHistory = async (userId) => {
    setShowLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/payment/get-payment-history",
        { userId }
      );
      if (data.success) {
        setShowLoading(false);
        setPaymentHistory(data.paymentHistory);
      } else {
        setShowLoading(false);
        setPaymentHistory(null);
      }
    } catch (error) {
      setShowLoading(false);
      toast.error(error.message);
    }
  };

  const loadCreditsData = async () => {
    setShowLoading(true);
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/load-Credits-Data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setShowLoading(false);
        setCredit(data.credits);
        // setUser(data.user);
      }
    } catch (error) {
      setShowLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateProfile = async (body) => {
    setShowLoading(true);
    try {
      const { data } = await axios.put(
        backendUrl + "/api/user/update-profile",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setShowLoading(false);
        setUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      setShowLoading(false);
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/");
  };

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    token,
    setToken,
    credit,
    setCredit,
    logout,
    backendUrl,
    // goToProtectedPage,
    showSafeSquareQ,
    setShowSafeSquareQ,
    showTheNetQ,
    setShowTheNetQ,
    showTheMatrixQ,
    setShowTheMatrixQ,
    updateProfile,
    paymentHistory,
    setPaymentHistory,
    loadCreditsData,
    getPaymentHistory,
    showLoading,
    setShowLoading,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
