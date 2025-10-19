import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SetPasswordModal({ isOpen, onClose, email, theme }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/set-password`,
        { email, password },
        { withCredentials: true }
      );

      toast.success(res.data.msg || "Password set successfully!");
      setTimeout(() => {
        onClose();
        window.location.reload(); // force them to log in again
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error setting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-2xl shadow-2xl w-96 border ${
          theme === "light" ? "bg-white border-blue-200" : "bg-slate-800 border-slate-700"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            theme === "light" 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600" 
              : "text-white"
          }`}
        >
          Set Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg focus:outline-none border font-medium focus:ring-2 transition ${
              theme === "light"
                ? "bg-blue-50 border-blue-300 text-gray-900 focus:border-blue-500 focus:ring-blue-200"
                : "bg-slate-700 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-500"
            }`}
            required
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className={`flex-1 py-2 rounded-lg transition-all duration-200 font-bold shadow-md hover:shadow-lg ${
                theme === "light"
                  ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600"
                  : "bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-700 hover:to-emerald-700"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2 rounded-lg transition-all duration-200 font-semibold ${
                theme === "light"
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300"
                  : "bg-slate-600 text-white hover:bg-slate-500 border border-slate-600"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
