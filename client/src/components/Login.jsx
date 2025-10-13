import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext.jsx";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const {
    setShowLogin,
    backendUrl,
    setToken,
    setUser,
    getPaymentHistory,
    setShowLoading,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const getOTP = async (e) => {
    e.preventDefault();
    if (state == "Sign Up") {
      if (!name || !email || !password || !agreedToTerms) {
        toast.error("Enter all details to get OTP");
        return;
      }
      setShowLoading(true);
      try {
        const { data } = await axios.post(backendUrl + "/api/user/send-otp", {
          name,
          email,
          password,
        });
        if (data.success) {
          setShowLoading(false);
          toast.success(data.message);
          setIsOtpSubmitted(true);
        } else {
          setShowLoading(false);
          toast(data.message);
        }
      } catch (error) {
        setShowLoading(false);
        toast.error("Failed to send OTP");
      }
    } else {
      if (!email) {
        toast.error("Please enter Email to get OTP");
        return;
      }
      setShowLoading(true);
      try {
        const { data } = await axios.post(
          backendUrl + "/api/user/send-reset-otp",
          { email }
        );
        if (data.success) {
          setShowLoading(false);
          toast.success(data.message);
        } else {
          setShowLoading(false);
          toast(data.message);
        }
      } catch (error) {
        setShowLoading(false);
        toast.error("Failed to send OTP");
      }
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter OTP to proceed");
      return;
    }
    // if (!agreedToTerms) {
    //   toast.error(
    //     "You must agree to the Terms and Conditions before continuing."
    //   );
    //   return;
    // }
    setShowLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/user/register", {
        email,
        otp,
      });
      if (data.success) {
        setShowLoading(false);
        toast.success(data.message);
        setShowLogin(false);
      } else {
        setShowLoading(false);
        toast(data.message);
      }
    } catch (error) {
      setShowLoading(false);
      toast.error(error.message);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Enter all Details");
      return;
    }
    setShowLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });
      if (data.success) {
        setShowLoading(false);
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        getPaymentHistory(data.user._id);
      } else {
        setShowLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setShowLoading(false);
      toast.error(error.message);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (!email || !otp || !password) {
      toast.error("Enter all Details");
      return;
    }
    setShowLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/verify-reset-otp",
        { email, otp, password }
      );
      if (data.success) {
        setShowLoading(false);
        toast.success(data.message);
        setShowLogin(false);
      } else {
        setShowLoading(false);
        toast(data.message);
      }
    } catch (error) {
      setShowLoading(false);
      toast.error(error.message);
    }
  };

  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();

  //   try {
  //     if (state == "Login") {
  //       const { data } = await axios.post(backendUrl + "/api/user/login", {
  //         email,
  //         password,
  //       });
  //       if (data.success) {
  //         setToken(data.token);
  //         setUser(data.user);
  //         localStorage.setItem("token", data.token);
  //         setShowLogin(false);
  //       } else {
  //         toast.error(data.message);
  //       }
  //     } else {
  //       // const { data } = await axios.post(backendUrl + "/api/user/register", {
  //       //   name,
  //       //   email,
  //       //   password,
  //       // });
  //       // if (data.success) {
  //       //   setToken(data.token);
  //       //   setUser(data.user);
  //       //   localStorage.setItem("token", data.token);
  //       //   setShowLogin(false);
  //       // } else {
  //       //   toast.error(data.message);
  //       // }
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.div
        // onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 70 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {state !== "forgotPass" && (
          <h1 className="text-center text-2xl text-neutral-700 font-medium">
            {state}
          </h1>
        )}
        {state == "forgotPass" && (
          <h1 className="text-center text-2xl text-neutral-700 font-medium">
            Change Password
          </h1>
        )}

        {state == "Login" && (
          <p className="text-sm mt-1 text-center">
            Welcome back! Please log in to continue
          </p>
        )}
        {state == "Sign Up" && (
          <p className="text-sm mt-1 text-center">Please sign up to continue</p>
        )}
        {state == "Sign Up" && (
          <div className="border px-5 py-2 flex items-center gap-2 rounded-full mt-5">
            <input
              disabled={isOtpSubmitted}
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              className="outline-none text-sm"
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <input
            disabled={isOtpSubmitted}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            className="outline-none text-sm"
          />
        </div>
        {state !== "Login" && (
          <div className="border  flex items-center gap-2 rounded-full mt-4">
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="text"
              placeholder="Enter OTP"
              className="outline-none text-sm py-2 px-6"
            />
            <button
              disabled={isOtpSubmitted}
              className={`rounded-full py-1.5 px-4 ${
                !isOtpSubmitted
                  ? "cursor-pointer bg-blue-600 hover:bg-blue-700 "
                  : "bg-gray-400 cursor-not-allowed"
              }  text-white`}
              onClick={getOTP}
            >
              Get OTP
            </button>
          </div>
        )}
        {state !== "forgotPass" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <input
              disabled={isOtpSubmitted}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="outline-none text-sm"
            />
          </div>
        )}
        {state == "forgotPass" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <input
              disabled={isOtpSubmitted}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="New Password"
              className="outline-none text-sm"
            />
          </div>
        )}
        {state == "Sign Up" && (
          <div className="flex items-center mt-4 gap-2 text-sm text-gray-400">
            <input
              disabled={isOtpSubmitted}
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <p>
              Agree to the{" "}
              <a href="/terms" className="cursor-pointer text-blue-600">
                Terms and Conditions
              </a>
            </p>
          </div>
        )}

        {state == "Login" && (
          <p
            onClick={() => setState("forgotPass")}
            className="text-sm text-blue-600 mt-4 cursor-pointer hover:text-blue-800"
          >
            Forgot password?
          </p>
        )}

        {state == "Login" && (
          <button
            onClick={loginUser}
            className="bg-blue-600 w-full text-white mt-4 py-2 rounded-full cursor-pointer hover:bg-blue-700"
          >
            Login
          </button>
        )}
        {state == "Sign Up" && (
          <button
            onClick={registerUser}
            disabled={!isOtpSubmitted}
            className={`w-full mt-4 py-2 rounded-full 
              ${
                !isOtpSubmitted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              } 
              text-white`}
          >
            Create account
          </button>
        )}
        {state == "forgotPass" && (
          <button
            onClick={changePassword}
            className="bg-blue-600 w-full text-white mt-4 py-2 rounded-full cursor-pointer hover:bg-blue-700"
          >
            Change Password
          </button>
        )}

        {state == "Login" || state == "forgotPass" ? (
          <p className="mt-5 text-center">
            New to BetBeast?
            <span
              className="text-blue-600 cursor-pointer hover:text-blue-800"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account
            <span
              className="text-blue-600 cursor-pointer hover:text-blue-800"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <MdClose
          onClick={() => {
            setShowLogin(false);
          }}
          className="text-xl absolute top-3 right-3 cursor-pointer"
        />
      </motion.div>
    </div>
  );
};

export default Login;
