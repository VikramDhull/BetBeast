import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import axios from "axios";
import { useRef } from "react";
import { AppContext } from "../Context/AppContext";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { setShowLoading } = useContext(AppContext);
  // const [captchaChecked, setCaptchaChecked] = useState(false);
  const recaptchaRef = useRef(null);
  const web3key = import.meta.env.VITE_WEB_FORM_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captchaToken = recaptchaRef.current.getValue();
    if (!captchaToken) {
      toast.error("Please verify CAPTCHA");
      return;
    }

    const formData = {
      access_key: web3key,
      name,
      email,
      message,
    };

    setShowLoading(true);
    try {
      const response = await axios.post(
        "https://api.web3forms.com/submit",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.data.success) {
        setShowLoading(false);
        // console.log("Success", response.data);
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        recaptchaRef.current.reset();
      } else {
        setShowLoading(false);
        console.error("Submission failed", response.data);
      }
    } catch (error) {
      setShowLoading(false);
      toast.error(error.message);
    }
    // if (!captchaChecked) {
    //   toast.error("Please verify CAPTCHA");
    //   return;
    // }
    // const recaptchaValue = recaptchaRef.current.getValue();
    // this.props.onSubmit(recaptchaValue);

    // // TODO: Connect with EmailJS or backend API
    // console.log("Form submitted:");
    // alert("Your message has been sent!");
    // setCaptchaChecked(false);
  };

  return (
    <section className="bg-gray-900 min-h-screen text-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-6">
        <h1 className="orbitron text-4xl font-bold mb-6 text-center text-white">
          Contact Us
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Have questions or feedback? Fill out the form below and we’ll get back
          to you as soon as possible.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 shadow-lg rounded-xl p-8 space-y-4"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          {/* CAPTCHA */}
          <div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer py-3 rounded-lg bg-red-600 hover:scale-101 text-white font-semibold transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
