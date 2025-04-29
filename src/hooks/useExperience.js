// src/hooks/useExperience.js
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { v4 as uuidv4 } from "uuid";

const useExperience = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);



  const updateExperienceContext = (index, key, value) => {
    setResumeInfo((prev) => {
      const updatedExperience = [...(prev.experience || [])];
      if (updatedExperience[index]) {
        updatedExperience[index] = {
          ...updatedExperience[index],
          [key]: value,
        };
      }
      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  };

  const addNewExperienceContext = () => {
    setResumeInfo((prev) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          id: uuidv4(), // ✅ unique identifier
          title: "",
          companyName: "",
          city: "",
          state: "",
          startDate: "",
          endDate: "",
          workSummary: "",
          currentlyWorking: false,
        },
      ],
    }));
  };
  const deleteExperienceContext = (indexToRemove) => {
    setResumeInfo((prev) => {
      const updatedExperience = [...(prev.experience || [])];
      
      if (updatedExperience.length > 0 && indexToRemove >= 0) {
        updatedExperience.splice(indexToRemove, 1); 
      }

      return {
        ...prev,
        experience: updatedExperience,
      };
    });
  };
  
  

  return {
    experienceList: resumeInfo?.experience || [],
    updateExperienceContext,
    addNewExperienceContext,
    deleteExperienceContext,
  };
};

export default useExperience;
