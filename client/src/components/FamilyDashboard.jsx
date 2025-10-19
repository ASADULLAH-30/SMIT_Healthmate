import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useFamilyContext } from "../context/FamilyContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Heart,
  Calendar,
  FileText,
  Activity,
  User,
  X,
  UserPlus,
} from "lucide-react";

const FamilyDashboard = ({ onMemberClick }) => {
  const { theme } = useTheme();
  const { familyMembers, addFamilyMember } = useFamilyContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    relation: "",
    age: "",
    bloodGroup: "",
  });

  const relationIcons = {
    Father: "👨",
    Mother: "👩",
    Wife: "👰",
    Husband: "🤵",
    Sister: "👧",
    Brother: "👦",
    Son: "👶",
    Daughter: "👧",
    Other: "👤",
  };

  const relationColors = {
    Father: "from-blue-500 to-blue-600",
    Mother: "from-pink-500 to-pink-600",
    Wife: "from-purple-500 to-purple-600",
    Husband: "from-indigo-500 to-indigo-600",
    Sister: "from-rose-500 to-rose-600",
    Brother: "from-cyan-500 to-cyan-600",
    Son: "from-green-500 to-green-600",
    Daughter: "from-yellow-500 to-yellow-600",
    Other: "from-gray-500 to-gray-600",
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.relation) {
      addFamilyMember(newMember);
      setNewMember({ name: "", relation: "", age: "", bloodGroup: "" });
      setShowAddModal(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div
        className={`px-6 py-4 border-b ${
          theme === "light"
            ? "bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200"
            : "bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl ${
                theme === "light"
                  ? "bg-gradient-to-br from-cyan-500 to-teal-600"
                  : "bg-gradient-to-br from-cyan-600 to-teal-700"
              } shadow-lg`}
            >
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                className={`text-2xl font-bold ${
                  theme === "light" ? "text-gray-900" : "text-gray-100"
                }`}
              >
                Family Dashboard
              </h2>
              <p
                className={`text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Manage your family's health records
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition-all ${
              theme === "light"
                ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:from-cyan-600 hover:to-teal-700"
                : "bg-gradient-to-r from-cyan-600 to-teal-700 text-white hover:from-cyan-700 hover:to-teal-800"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Add Family Member
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex-1 p-6 overflow-y-auto ${
          theme === "light"
            ? "bg-gradient-to-br from-cyan-50/30 to-teal-50/30"
            : "bg-slate-900/50"
        }`}
      >
        {familyMembers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full gap-6"
          >
            <div
              className={`p-8 rounded-3xl ${
                theme === "light"
                  ? "bg-gradient-to-br from-cyan-100 to-teal-100"
                  : "bg-gradient-to-br from-cyan-900/20 to-teal-900/20"
              } shadow-xl`}
            >
              <Users
                className={`w-16 h-16 ${
                  theme === "light" ? "text-cyan-600" : "text-cyan-400"
                }`}
              />
            </div>
            <div className="text-center max-w-md">
              <h3
                className={`text-2xl font-bold mb-2 ${
                  theme === "light" ? "text-gray-900" : "text-gray-100"
                }`}
              >
                No Family Members Added
              </h3>
              <p
                className={`text-sm ${
                  theme === "light" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                Add your family members to start tracking their health records
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {familyMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                onClick={() => onMemberClick && onMemberClick(member.id)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all shadow-lg hover:shadow-2xl ${
                  theme === "light"
                    ? "bg-white border-cyan-200 hover:border-cyan-400"
                    : "bg-slate-800 border-slate-700 hover:border-cyan-600"
                }`}
              >
                {/* Avatar with Emoji */}
                <div className="flex flex-col items-center gap-4">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl bg-gradient-to-br ${
                      relationColors[member.relation] ||
                      "from-gray-500 to-gray-600"
                    } shadow-lg`}
                  >
                    {relationIcons[member.relation] || "👤"}
                  </div>

                  <div className="text-center w-full">
                    <h3
                      className={`text-lg font-bold truncate ${
                        theme === "light" ? "text-gray-900" : "text-gray-100"
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`text-sm font-medium ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {member.relation}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="w-full space-y-2">
                    {member.age && (
                      <div
                        className={`flex items-center justify-between text-xs ${
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          Age
                        </span>
                        <span className="font-semibold">{member.age}</span>
                      </div>
                    )}
                    {member.bloodGroup && (
                      <div
                        className={`flex items-center justify-between text-xs ${
                          theme === "light" ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          Blood
                        </span>
                        <span className="font-semibold">
                          {member.bloodGroup}
                        </span>
                      </div>
                    )}
                    <div
                      className={`flex items-center justify-between text-xs ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Records
                      </span>
                      <span className="font-semibold">
                        {member.medicalRecords?.length || 0}
                      </span>
                    </div>
                  </div>

                  {/* View Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                      theme === "light"
                        ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:from-cyan-600 hover:to-teal-700"
                        : "bg-gradient-to-r from-cyan-600 to-teal-700 text-white hover:from-cyan-700 hover:to-teal-800"
                    }`}
                  >
                    View Records
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-2xl shadow-2xl ${
                theme === "light" ? "bg-white" : "bg-slate-900"
              }`}
            >
              {/* Modal Header */}
              <div
                className={`px-6 py-4 border-b flex items-center justify-between ${
                  theme === "light"
                    ? "bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200"
                    : "bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700"
                }`}
              >
                <h3
                  className={`text-xl font-bold ${
                    theme === "light" ? "text-gray-900" : "text-gray-100"
                  }`}
                >
                  Add Family Member
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddModal(false)}
                  className={`p-2 rounded-xl transition-colors ${
                    theme === "light"
                      ? "hover:bg-gray-200 text-gray-600"
                      : "hover:bg-slate-800 text-gray-400"
                  }`}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) =>
                      setNewMember({ ...newMember, name: e.target.value })
                    }
                    placeholder="Enter name"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition ${
                      theme === "light"
                        ? "border border-cyan-300 bg-white focus:ring-cyan-400 text-gray-900"
                        : "border border-slate-700 bg-slate-800 focus:ring-cyan-500 text-gray-200"
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-2 ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    Relation *
                  </label>
                  <select
                    value={newMember.relation}
                    onChange={(e) =>
                      setNewMember({ ...newMember, relation: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition ${
                      theme === "light"
                        ? "border border-cyan-300 bg-white focus:ring-cyan-400 text-gray-900"
                        : "border border-slate-700 bg-slate-800 focus:ring-cyan-500 text-gray-200"
                    }`}
                  >
                    <option value="">Select relation</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Wife">Wife</option>
                    <option value="Husband">Husband</option>
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      value={newMember.age}
                      onChange={(e) =>
                        setNewMember({ ...newMember, age: e.target.value })
                      }
                      placeholder="Age"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition ${
                        theme === "light"
                          ? "border border-cyan-300 bg-white focus:ring-cyan-400 text-gray-900"
                          : "border border-slate-700 bg-slate-800 focus:ring-cyan-500 text-gray-200"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${
                        theme === "light" ? "text-gray-700" : "text-gray-300"
                      }`}
                    >
                      Blood Group
                    </label>
                    <select
                      value={newMember.bloodGroup}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          bloodGroup: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition ${
                        theme === "light"
                          ? "border border-cyan-300 bg-white focus:ring-cyan-400 text-gray-900"
                          : "border border-slate-700 bg-slate-800 focus:ring-cyan-500 text-gray-200"
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  onClick={handleAddMember}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!newMember.name || !newMember.relation}
                  className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                    newMember.name && newMember.relation
                      ? theme === "light"
                        ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:from-cyan-600 hover:to-teal-700"
                        : "bg-gradient-to-r from-cyan-600 to-teal-700 text-white hover:from-cyan-700 hover:to-teal-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Add Member
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FamilyDashboard;
