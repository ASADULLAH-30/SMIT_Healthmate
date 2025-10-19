import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useFamilyContext } from "../context/FamilyContext";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Calendar,
  Stethoscope,
  FileText,
  AlertCircle,
  Upload,
  X,
  Trash2,
  Activity,
  TrendingUp,
} from "lucide-react";

const FamilyMemberDetail = ({ memberId, onBack }) => {
  const { theme } = useTheme();
  const { getFamilyMember, addMedicalRecord, deleteMedicalRecord } = useFamilyContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split("T")[0],
    doctorName: "",
    doctorSpecialty: "",
    illness: "",
    reportType: "",
    majorFindings: "",
    prescription: "",
    nextVisit: "",
    notes: "",
  });

  const member = getFamilyMember(memberId);

  if (!member) return <div className="flex items-center justify-center h-full"><p>Member not found</p></div>;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") setPdfFile(file);
  };

  const handleAddRecord = () => {
    if (newRecord.date && newRecord.doctorName && newRecord.illness && newRecord.reportType) {
      addMedicalRecord(memberId, {
        ...newRecord,
        pdfFileName: pdfFile?.name || "",
        pdfSize: pdfFile?.size || 0,
      });
      setNewRecord({
        date: new Date().toISOString().split("T")[0],
        doctorName: "",
        doctorSpecialty: "",
        illness: "",
        reportType: "",
        majorFindings: "",
        prescription: "",
        nextVisit: "",
        notes: "",
      });
      setPdfFile(null);
      setShowAddModal(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className={`px-6 py-4 border-b ${
        theme === "light" ? "bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200" : "bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700"
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button onClick={onBack} whileHover={{ scale: 1.05 }} className={`p-2 rounded-xl ${theme === "light" ? "hover:bg-cyan-100" : "hover:bg-slate-700"}`}>
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <div>
              <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
                {member.name}'s Records
              </h2>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                {member.relation} • {member.medicalRecords?.length || 0} records
              </p>
            </div>
          </div>
          <motion.button onClick={() => setShowAddModal(true)} whileHover={{ scale: 1.05 }} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg ${
            theme === "light" ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white" : "bg-gradient-to-r from-cyan-600 to-teal-700 text-white"
          }`}>
            <Plus className="w-4 h-4" />
            Add Record
          </motion.button>
        </div>
      </div>

      {/* Records List */}
      <div className={`flex-1 p-6 overflow-y-auto ${theme === "light" ? "bg-gradient-to-br from-cyan-50/30 to-teal-50/30" : "bg-slate-900/50"}`}>
        {!member.medicalRecords || member.medicalRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <FileText className={`w-16 h-16 ${theme === "light" ? "text-cyan-600" : "text-cyan-400"}`} />
            <h3 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>No Medical Records</h3>
          </div>
        ) : (
          <div className="space-y-4 max-w-5xl mx-auto">
            {member.medicalRecords.map((record, index) => (
              <motion.div key={record.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border shadow-lg ${theme === "light" ? "bg-white border-cyan-200" : "bg-slate-800 border-slate-700"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-xl ${theme === "light" ? "bg-gradient-to-br from-cyan-500 to-teal-600" : "bg-gradient-to-br from-cyan-600 to-teal-700"}`}>
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-1 ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>{record.reportType}</h3>
                      <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>{formatDate(record.date)}</p>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.1 }} onClick={() => deleteMedicalRecord(memberId, record.id)}
                    className={`p-2 rounded-lg ${theme === "light" ? "bg-red-100 text-red-600" : "bg-red-900/30 text-red-400"}`}>
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-xs font-semibold mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}><Stethoscope className="w-3 h-3 inline mr-1" />Doctor</p>
                    <p className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>Dr. {record.doctorName}</p>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold mb-1 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}><AlertCircle className="w-3 h-3 inline mr-1" />Illness</p>
                    <p className={`text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-200"}`}>{record.illness}</p>
                  </div>
                </div>
                {record.majorFindings && (
                  <div className="mt-4">
                    <p className={`text-xs font-semibold mb-2 ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}><TrendingUp className="w-3 h-3 inline mr-1" />Major Findings</p>
                    <p className={`text-sm p-3 rounded-xl ${theme === "light" ? "bg-cyan-50 text-gray-900" : "bg-slate-900/50 text-gray-200"}`}>{record.majorFindings}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowAddModal(false)}>
          <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl ${theme === "light" ? "bg-white" : "bg-slate-900"}`}>
            <div className={`sticky top-0 px-6 py-4 border-b flex items-center justify-between ${theme === "light" ? "bg-cyan-50 border-cyan-200" : "bg-slate-800 border-slate-700"}`}>
              <h3 className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>Add Medical Record</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Date *</label>
                  <input type="date" value={newRecord.date} onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm ${theme === "light" ? "border-cyan-300 bg-white text-gray-900" : "border-slate-700 bg-slate-800 text-gray-200"}`} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Doctor Name *</label>
                  <input type="text" value={newRecord.doctorName} onChange={(e) => setNewRecord({ ...newRecord, doctorName: e.target.value })}
                    placeholder="Dr. John Smith" className={`w-full px-4 py-2.5 rounded-xl text-sm ${theme === "light" ? "border-cyan-300 bg-white text-gray-900" : "border-slate-700 bg-slate-800 text-gray-200"}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Report Type *</label>
                  <input type="text" value={newRecord.reportType} onChange={(e) => setNewRecord({ ...newRecord, reportType: e.target.value })}
                    placeholder="Blood Test, X-Ray, etc." className={`w-full px-4 py-2.5 rounded-xl text-sm ${theme === "light" ? "border-cyan-300 bg-white text-gray-900" : "border-slate-700 bg-slate-800 text-gray-200"}`} />
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Illness *</label>
                  <input type="text" value={newRecord.illness} onChange={(e) => setNewRecord({ ...newRecord, illness: e.target.value })}
                    placeholder="Fever, Diabetes, etc." className={`w-full px-4 py-2.5 rounded-xl text-sm ${theme === "light" ? "border-cyan-300 bg-white text-gray-900" : "border-slate-700 bg-slate-800 text-gray-200"}`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Major Findings *</label>
                <textarea rows="3" value={newRecord.majorFindings} onChange={(e) => setNewRecord({ ...newRecord, majorFindings: e.target.value })}
                  placeholder="Describe findings..." className={`w-full px-4 py-3 rounded-xl text-sm resize-none ${theme === "light" ? "border-cyan-300 bg-white text-gray-900" : "border-slate-700 bg-slate-800 text-gray-200"}`} />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>Upload PDF (Optional)</label>
                <div className={`border-2 border-dashed rounded-xl p-4 cursor-pointer ${pdfFile ? "border-teal-400 bg-teal-50" : "border-cyan-300 hover:border-cyan-500"}`}
                  onClick={() => document.getElementById("record-pdf").click()}>
                  <input id="record-pdf" type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                  <div className="flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    <span className="text-sm">{pdfFile ? pdfFile.name : "Click to upload PDF"}</span>
                  </div>
                </div>
              </div>
              <button onClick={handleAddRecord} disabled={!newRecord.date || !newRecord.doctorName || !newRecord.illness || !newRecord.reportType}
                className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg ${
                  newRecord.date && newRecord.doctorName && newRecord.illness && newRecord.reportType
                    ? theme === "light" ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white" : "bg-gradient-to-r from-cyan-600 to-teal-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}>
                Add Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyMemberDetail;
