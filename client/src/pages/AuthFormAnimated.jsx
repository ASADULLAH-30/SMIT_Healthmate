import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Joi from "joi";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SetPasswordModal from "../components/SetPasswordModal.jsx";
import { toast } from "react-toastify";
import { googleAuth } from "../api.js";
import { motion, AnimatePresence } from "framer-motion";

function AuthForm() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("Sign up");
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      const formattedErrors = {};
      error.details.forEach((detail) => {
        formattedErrors[detail.path[0]] = detail.message;
      });
      setErrors(formattedErrors);
    } else {
      setErrors({});
      try {
        const url = formState === "Sign up" ? "/register" : "/login";
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth${url}`,
          formData,
          { withCredentials: true }
        );
        if (res.data.code === "PASSWORD_NOT_SET") {
          setShowModal(true);
        } else {
          toast.success(res.data.msg);
          navigate("/home");
        }
      } catch (err) {
        toast.error(err.response?.data?.msg || "Something went wrong");
      }
    }
  };

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "This field is required.",
        "string.email": "Please enter a valid email address.",
      }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "This field is required.",
      "string.min": "Password must be at least 6 characters long.",
    }),
    name:
      formState === "Sign up"
        ? Joi.string().min(3).required().messages({
            "string.empty": "Name is required.",
            "string.min": "Name must be at least 3 characters long.",
          })
        : Joi.optional(),
  });

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        await googleAuth(authResult["code"]);
      }
      navigate("/home");
    } catch (error) {
      console.error("Error while requesting google code: ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`border shadow-2xl backdrop-blur-sm ${
        theme === "light"
          ? "border-blue-200 bg-white/95 text-gray-900"
          : "border-slate-700 bg-slate-800/95 text-white"
      } lg:w-1/2 xl:w-5/12 p-6 sm:p-12 rounded-3xl`}
    >
      <div className="mt-8 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center text-3xl shadow-lg"
        >
          🩺
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.h1
            key={formState}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="text-2xl xl:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
          >
            {formState === "Sign up" ? "Create Account" : "Welcome Back"}
          </motion.h1>
        </AnimatePresence>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`mt-2 text-sm ${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={formState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {formState === "Sign up"
                ? "Join HealthMate AI today"
                : "Continue your health journey"}
            </motion.span>
          </AnimatePresence>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full flex-1 mt-8"
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <motion.button
                onClick={googleLogin}
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full max-w-xs font-bold cursor-pointer shadow-md rounded-xl py-3 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow-lg ${
                  theme === "light"
                    ? "bg-blue-50 text-gray-800 border border-blue-200 hover:bg-blue-100"
                    : "bg-slate-700 text-white border border-slate-600"
                }`}
              >
                <div className="bg-white p-2 rounded-full">
                  <svg className="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </div>
                <span className="ml-4">
                  {formState === "Sign up"
                    ? "Sign Up with Google"
                    : "Log in with Google"}
                </span>
              </motion.button>
            </div>

            <div className="my-12 border-b text-center">
              <div
                className={`leading-none px-2 inline-block text-sm tracking-wide font-medium transform translate-y-1/2 ${
                  theme === "light"
                    ? "text-gray-700 bg-white"
                    : "text-gray-300 bg-slate-800"
                }`}
              >
                {formState === "Sign up"
                  ? "Or sign up with e-mail"
                  : "Or log in with e-mail"}
              </div>
            </div>

            <div className="mx-auto max-w-xs">
              <AnimatePresence mode="wait">
                {formState === "Sign up" ? (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      className={`w-full px-8 py-4 rounded-xl font-medium text-sm focus:outline-none mt-5 transition-all ${
                        theme === "light"
                          ? "bg-blue-50 border border-blue-200 placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                          : "bg-slate-700 border border-slate-600 placeholder-gray-400 text-white focus:border-blue-400 focus:bg-slate-600"
                      }`}
                      type="text"
                      placeholder="User Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex justify-center mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}

                    <input
                      className={`w-full px-8 py-4 rounded-xl font-medium text-sm focus:outline-none mt-5 transition-all ${
                        theme === "light"
                          ? "bg-blue-50 border border-blue-200 placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                          : "bg-slate-700 border border-slate-600 placeholder-gray-400 text-white focus:border-blue-400 focus:bg-slate-600"
                      }`}
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex justify-center mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}

                    <input
                      className={`w-full px-8 py-4 rounded-xl font-medium text-sm focus:outline-none mt-5 transition-all ${
                        theme === "light"
                          ? "bg-blue-50 border border-blue-200 placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                          : "bg-slate-700 border border-slate-600 placeholder-gray-400 text-white focus:border-blue-400 focus:bg-slate-600"
                      }`}
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex justify-center mt-1"
                      >
                        {errors.password}
                      </motion.p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={`mt-6 tracking-wide font-bold w-full py-4 rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none shadow-md hover:shadow-lg ${
                        theme === "light"
                          ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600"
                          : "bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700"
                      }`}
                    >
                      <span>Sign Up</span>
                    </motion.button>

                    <p className="flex justify-center mt-4 text-sm">
                      Already have an account?{" "}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => {
                          setFormState("Log in");
                          setFormData({ ...formData, name: "" });
                        }}
                        className="text-emerald-600 cursor-pointer hover:text-emerald-700 font-semibold ml-1"
                      >
                        Click here
                      </motion.button>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <input
                      className={`w-full px-8 py-4 rounded-xl font-medium text-sm focus:outline-none mt-5 transition-all ${
                        theme === "light"
                          ? "bg-blue-50 border border-blue-200 placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                          : "bg-slate-700 border border-slate-600 placeholder-gray-400 text-white focus:border-blue-400 focus:bg-slate-600"
                      }`}
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex justify-center mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}

                    <input
                      className={`w-full px-8 py-4 rounded-xl font-medium text-sm focus:outline-none mt-5 transition-all ${
                        theme === "light"
                          ? "bg-blue-50 border border-blue-200 placeholder-gray-500 text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                          : "bg-slate-700 border border-slate-600 placeholder-gray-400 text-white focus:border-blue-400 focus:bg-slate-600"
                      }`}
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm flex justify-center mt-1"
                      >
                        {errors.password}
                      </motion.p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className={`mt-6 tracking-wide font-bold w-full py-4 rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none shadow-md hover:shadow-lg ${
                        theme === "light"
                          ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600"
                          : "bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700"
                      }`}
                    >
                      <span>Log in</span>
                    </motion.button>

                    <p className="flex justify-center mt-4 text-sm">
                      Don't have an account?{" "}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setFormState("Sign up")}
                        className="text-emerald-600 cursor-pointer hover:text-emerald-700 font-semibold ml-1"
                      >
                        Click here
                      </motion.button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={`mt-6 text-xs text-center ${
                  theme === "light" ? "text-gray-700" : "text-gray-400"
                }`}
              >
                By continuing, you agree to our{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Terms
                </span>{" "}
                and{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Privacy Policy
                </span>
              </motion.p>
            </div>
          </form>
        </motion.div>
      </div>
      
      <SetPasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        email={formData.email}
        theme={theme}
      />
    </motion.div>
  );
}

export default AuthForm;
