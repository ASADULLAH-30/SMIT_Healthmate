import React, { createContext, useContext, useState, useEffect } from "react";

const FamilyContext = createContext();

export const useFamilyContext = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error("useFamilyContext must be used within a FamilyProvider");
  }
  return context;
};

export const FamilyProvider = ({ children }) => {
  const [familyMembers, setFamilyMembers] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("healthmate_family_members");
    if (saved) {
      try {
        setFamilyMembers(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading family members:", error);
      }
    }
  }, []);

  // Save to localStorage whenever changes
  useEffect(() => {
    localStorage.setItem("healthmate_family_members", JSON.stringify(familyMembers));
  }, [familyMembers]);

  const addFamilyMember = (member) => {
    const newMember = {
      id: Date.now(),
      name: member.name,
      relation: member.relation,
      age: member.age || "",
      bloodGroup: member.bloodGroup || "",
      allergies: member.allergies || "",
      chronicConditions: member.chronicConditions || "",
      emergencyContact: member.emergencyContact || "",
      createdAt: new Date().toISOString(),
      medicalRecords: [],
    };
    
    setFamilyMembers((prev) => [...prev, newMember]);
    return newMember.id;
  };

  const updateFamilyMember = (id, updates) => {
    setFamilyMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, ...updates } : member
      )
    );
  };

  const deleteFamilyMember = (id) => {
    setFamilyMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const getFamilyMember = (id) => {
    return familyMembers.find((member) => member.id === id);
  };

  const addMedicalRecord = (memberId, record) => {
    const newRecord = {
      id: Date.now(),
      date: record.date,
      doctorName: record.doctorName,
      doctorSpecialty: record.doctorSpecialty || "",
      illness: record.illness,
      reportType: record.reportType,
      majorFindings: record.majorFindings,
      prescription: record.prescription || "",
      nextVisit: record.nextVisit || "",
      pdfFileName: record.pdfFileName || "",
      pdfSize: record.pdfSize || 0,
      notes: record.notes || "",
      createdAt: new Date().toISOString(),
    };

    setFamilyMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              medicalRecords: [newRecord, ...(member.medicalRecords || [])],
            }
          : member
      )
    );

    return newRecord.id;
  };

  const deleteMedicalRecord = (memberId, recordId) => {
    setFamilyMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? {
              ...member,
              medicalRecords: member.medicalRecords.filter(
                (record) => record.id !== recordId
              ),
            }
          : member
      )
    );
  };

  return (
    <FamilyContext.Provider
      value={{
        familyMembers,
        addFamilyMember,
        updateFamilyMember,
        deleteFamilyMember,
        getFamilyMember,
        addMedicalRecord,
        deleteMedicalRecord,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};
