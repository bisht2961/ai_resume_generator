// src/hooks/useEducation.js
import { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { v4 as uuidv4 } from "uuid";

const useEducation = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const updateEducationContext = (index, key, value) => {
    setResumeInfo((prev) => {
      const updatedEducation = [...(prev.education || [])];
      if (updatedEducation[index]) {
        updatedEducation[index] = {
          ...updatedEducation[index],
          [key]: value,
        };
      }
      return {
        ...prev,
        education: updatedEducation,
      };
    });
  };

  const addNewEducationContext = () => {
    setResumeInfo((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          id: uuidv4(),
          universityName: "",
          degree: "",
          major: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };
  const deleteEducationContext = (indexToRemove) => {
    setResumeInfo((prev) => {
      const updatedEducation = [...(prev.education || [])];

      if (updatedEducation.length > 0 && indexToRemove >= 0) {
        updatedEducation.splice(indexToRemove, 1);
      }

      return {
        ...prev,
        education: updatedEducation,
      };
    });
  };

  return {
    educationList: resumeInfo?.education || [],
    updateEducationContext,
    addNewEducationContext,
    deleteEducationContext,
  };
};

export default useEducation;
